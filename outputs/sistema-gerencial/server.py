#!/usr/bin/env python3

import json
import mimetypes
import os
import sqlite3
import time
import unicodedata
import uuid
from datetime import datetime
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import unquote
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parent
DATA_DIR = Path(os.environ.get("DATA_DIR", ROOT))
DATA_DIR.mkdir(parents=True, exist_ok=True)
DB_PATH = DATA_DIR / "sistema-gerencial.db"
CRM_SEED_PATH = ROOT / "crm-seed.json"
ACCOUNTS_RECEIVABLE_SEED_PATH = ROOT / "accounts-receivable-seed.json"
PURCHASE_ORDERS_SEED_PATH = ROOT / "purchase-orders-seed.json"
CONTROL_SALES_SEED_PATH = ROOT / "control-sales-seed.json"
CONTROL_SALES_FINANCIAL_ORDER_CUTOFF = "2026-07-01"
HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "8097"))
API_VERSION = "kmi-quotations-v1"
ADMIN_EMAIL = "luisvallacastro@gmail.com"
CRM_SELLER_ACCOUNT_LINKS = {
    "gabriela natalie amador flores": "u-xlsx-gabriela-amador",
    "gabriela amador": "u-xlsx-gabriela-amador",
    "asesorayc konfinversiones com": "u-xlsx-gabriela-amador",
    "asesorayc": "u-xlsx-gabriela-amador",
    "marjorie morales": "u-xlsx-marjorie-morales",
    "asesor arteycolor gmail com": "u-xlsx-marjorie-morales",
    "asesor arteycolor": "u-xlsx-marjorie-morales",
}
AREA_KEYS = ["comercializacion", "financiera", "operaciones", "rrhh"]
AREA_SECTION_KEYS = {
    "comercializacion": ["resultados", "resultados-oportunidades", "resultados-dashboard", "kpi", "crm", "crm-seguimiento"],
    "financiera": ["resultados", "resultados-pedidos", "resultados-cuentas-por-cobrar", "resultados-ordenes-de-pedido", "kpi"],
    "operaciones": ["resultados", "resultados-control-ventas", "kpi"],
    "rrhh": ["resultados", "kpi"],
}
VALID_ROLES = {"gerencias", "jefaturas", "operativos", "accionistas"}
ADMIN_CONSOLIDATED_PERMISSION_KEYS = [
    "administracion:riesgos",
    "administracion:solicitudes",
]
ADMIN_MINUTE_PERMISSION_KEYS = [
    "administracion:actas-nueva",
    "administracion:actas-historial",
]
LEGACY_ROLE_MAP = {
    "general": "gerencias",
    "comercializacion": "gerencias",
    "financiera": "gerencias",
    "operaciones": "gerencias",
    "rrhh": "gerencias",
}


def is_commercial_management_user(user):
    """Authorize the single commercial-management account for migrated lifecycle actions."""
    if not user:
        return False
    user_id = text(user.get("id")).lower()
    username = text(user.get("username")).lower()
    email = text(user.get("email")).lower()
    name = "".join(
        character
        for character in unicodedata.normalize("NFD", text(user.get("name")).lower())
        if unicodedata.category(character) != "Mn"
    )
    return (
        user_id == "user-comercial"
        or username == "comercializacion"
        or email == "comercializacion@empresa.local"
        or ("gerencia" in name and "comercial" in name)
    )
ALL_OPERATIONAL_PERMISSIONS = [
    f"{area}:{section}"
    for area in AREA_KEYS
    for section in AREA_SECTION_KEYS[area]
]
ALL_PERMISSIONS = [
    *ALL_OPERATIONAL_PERMISSIONS,
    *ADMIN_CONSOLIDATED_PERMISSION_KEYS,
    *ADMIN_MINUTE_PERMISSION_KEYS,
]

DEFAULT_USERS = [
    {
        "id": "user-admin-luis",
        "name": "Luis Valladares",
        "username": "luisvallacastro",
        "email": ADMIN_EMAIL,
        "role": "gerencias",
        "password": "admin123",
        "admin": True,
    },
    {"id": "user-general", "name": "Gerencia general", "username": "general", "email": "general@empresa.local", "role": "gerencias", "password": "admin123"},
    {"id": "user-accionistas", "name": "Accionistas", "username": "accionistas", "email": "accionistas@empresa.local", "role": "accionistas", "password": "admin123"},
    {"id": "user-financiera", "name": "Gerencia financiera", "username": "financiera", "email": "financiera@empresa.local", "role": "gerencias", "password": "admin123"},
    {"id": "user-comercial", "name": "Gerencia comercializacion", "username": "comercializacion", "email": "comercializacion@empresa.local", "role": "gerencias", "password": "admin123"},
    {"id": "user-operaciones", "name": "Gerencia operaciones", "username": "operaciones", "email": "operaciones@empresa.local", "role": "gerencias", "password": "admin123"},
    {"id": "user-rrhh", "name": "Gerencia recursos humanos", "username": "rrhh", "email": "rrhh@empresa.local", "role": "gerencias", "password": "admin123"},
]


def text(value, fallback=""):
    raw = str(value if value is not None else fallback).strip()
    return raw or str(fallback or "").strip()


def crm_money(value):
    try:
        amount = float(value or 0)
    except (TypeError, ValueError):
        amount = 0
    return "${:,.0f}".format(amount)


def whole_number(value, fallback=0):
    try:
        return int(value if value is not None else fallback)
    except (TypeError, ValueError):
        return int(fallback)


def crm_key(value):
    source = text(value, "cliente").lower()
    cleaned = []
    previous_dash = False
    for char in source:
        if char.isalnum():
            cleaned.append(char)
            previous_dash = False
        elif not previous_dash:
            cleaned.append("-")
            previous_dash = True
    return "".join(cleaned).strip("-")[:80] or "cliente"


def crm_percent(value, fallback=0):
    try:
        return int(float(value if value is not None else fallback) or 0)
    except (TypeError, ValueError):
        return 0


def load_crm_seed():
    with CRM_SEED_PATH.open("r", encoding="utf-8") as handle:
        data = json.load(handle)
    data.setdefault("gestiones", [])
    data.setdefault("customers", [])
    return data


def sync_crm_seed_updates(data):
    seed = load_crm_seed()
    seed_version = text(seed.get("opportunityImportVersion"))
    if not seed_version or text(data.get("opportunityImportVersion")) == seed_version:
        return data, False

    existing_users = data.setdefault("users", [])
    existing_user_ids = {text(user.get("id")) for user in existing_users}
    existing_user_emails = {text(user.get("email")).lower() for user in existing_users if text(user.get("email"))}
    for seed_user in seed.get("users", []):
        seed_email = text(seed_user.get("email")).lower()
        if text(seed_user.get("id")) not in existing_user_ids and seed_email not in existing_user_emails:
            existing_users.append(seed_user)

    data["opportunities"] = seed.get("opportunities", [])
    data["customers"] = seed.get("customers", [])
    data["agenda"] = seed.get("agenda", [])
    data["gestiones"] = seed.get("gestiones", [])
    data["opportunityImportVersion"] = seed_version
    data["opportunityImportLabel"] = text(seed.get("opportunityImportLabel"))
    return data, True


def sync_crm_result_closures(conn, data):
    row = conn.execute("SELECT value FROM app_state WHERE key = 'opportunities'").fetchone()
    if not row:
        return data, False
    try:
        result_opportunities = json.loads(row["value"] or "[]")
    except json.JSONDecodeError:
        return data, False
    if not isinstance(result_opportunities, list):
        return data, False

    lost_crm_ids = set()
    won_crm_ids = {}
    result_wins = []
    for item in result_opportunities:
        crm_opportunity_id = text(item.get("crmOpportunityId"))
        managements = item.get("managements") if isinstance(item.get("managements"), list) else []
        latest_closure = next((
            management for management in reversed(managements)
            if not management.get("canceled")
            and text(management.get("stage")).lower() in {"cierre", "cierre de ventas"}
            and text(management.get("result"))
        ), None)
        closure_result = text((latest_closure or {}).get("result")).lower()
        if closure_result == "ganado":
            tracking_win = item.get("trackingWin") if isinstance(item.get("trackingWin"), dict) else {}
            result_wins.append({
                "id": text(item.get("id")),
                "opportunityId": text(item.get("id")),
                "crmOpportunityId": crm_opportunity_id,
                "quotationId": text(item.get("quotationId")),
                "quotationNumber": text(item.get("quotationNumber")),
                "managementId": text((latest_closure or {}).get("id")),
                "date": text((latest_closure or {}).get("date"), item.get("date")),
                "time": text((latest_closure or {}).get("time")),
                "company": text(item.get("company"), "Cliente sin nombre"),
                "seller": text(item.get("seller"), "Sin vendedor"),
                "amount": float(item.get("amount") or 0),
                "segment": text(item.get("segment")),
                "comment": text((latest_closure or {}).get("comment"), "Cierre ganado registrado."),
                "createdAt": text(tracking_win.get("createdAt")),
            })
            if crm_opportunity_id:
                won_crm_ids[crm_opportunity_id] = latest_closure
        elif closure_result == "perdida" and crm_opportunity_id:
            lost_crm_ids.add(crm_opportunity_id)

    result_wins.sort(key=lambda item: f"{item.get('date', '')} {item.get('time', '')}", reverse=True)
    changed = data.get("resultWins") != result_wins
    if changed:
        data["resultWins"] = result_wins
    for opportunity in data.get("opportunities", []):
        won_closure = won_crm_ids.get(text(opportunity.get("id")))
        if won_closure and (
            text(opportunity.get("status")).lower() != "ganada"
            or opportunity.get("wonManagementId") != won_closure.get("id")
        ):
            opportunity["status"] = "Ganada"
            opportunity["wonAt"] = text(won_closure.get("date"))
            opportunity["wonManagementId"] = text(won_closure.get("id"))
            changed = True
        if opportunity.get("id") not in lost_crm_ids:
            continue
        if text(opportunity.get("status")).lower() != "perdida" or not opportunity.get("archived"):
            opportunity["status"] = "Perdida"
            opportunity["archived"] = True
            opportunity["archivedReason"] = "Cierre perdido"
            opportunity["archivedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            changed = True
    return data, changed


def read_result_opportunities(conn):
    row = conn.execute("SELECT value FROM app_state WHERE key = 'opportunities'").fetchone()
    if not row:
        return []
    try:
        items = json.loads(row["value"] or "[]")
    except json.JSONDecodeError:
        return []
    return items if isinstance(items, list) else []


def write_result_opportunities(conn, items):
    conn.execute("""
        INSERT INTO app_state (key, value, updated_at)
        VALUES ('opportunities', ?, CURRENT_TIMESTAMP)
        ON CONFLICT(key) DO UPDATE SET
            value = excluded.value,
            updated_at = CURRENT_TIMESTAMP
    """, (json.dumps(items, ensure_ascii=True),))


def repair_future_dated_result_migrations(conn):
    """Restore migrations dated with UTC instead of El Salvador local time."""
    row = conn.execute("SELECT value FROM app_state WHERE key = 'opportunities'").fetchone()
    if not row:
        return 0
    try:
        items = json.loads(row["value"] or "[]")
    except json.JSONDecodeError:
        return 0
    if not isinstance(items, list):
        return 0

    repaired = 0
    for item in items:
        migrated_at = text(item.get("migratedAt"))
        try:
            migration_local = datetime.fromisoformat(
                migrated_at.replace("Z", "+00:00")
            ).astimezone(ZoneInfo("America/El_Salvador"))
            migration_date = migration_local.strftime("%Y-%m-%d")
            migration_time = migration_local.strftime("%H:%M")
        except (TypeError, ValueError):
            migration_date = migrated_at.split("T", 1)[0]
            migration_time = ""
        result_date = text(item.get("date"))
        if not text(item.get("crmOpportunityId")) or len(migration_date) != 10:
            continue
        if len(result_date) != 10 or result_date <= migration_date:
            continue
        item["agendaDate"] = text(item.get("agendaDate"), result_date)
        item["date"] = migration_date
        if migration_time:
            item["time"] = migration_time
        managements = item.get("managements") if isinstance(item.get("managements"), list) else []
        for management in managements:
            comment = text(management.get("comment")).lower()
            if "migrada desde crm" in comment and text(management.get("date")) > migration_date:
                management["date"] = migration_date
                if migration_time:
                    management["time"] = migration_time
        repaired += 1

    if repaired:
        write_result_opportunities(conn, items)
    return repaired


def result_opportunity_dependencies(conn, opportunity_id):
    """Return human-readable dependencies that make a lifecycle change unsafe."""
    dependencies = []
    if conn.execute(
        "SELECT 1 FROM quotations WHERE opportunity_id = ? LIMIT 1",
        (opportunity_id,),
    ).fetchone():
        dependencies.append("cotizaciones")
    if conn.execute(
        "SELECT 1 FROM control_sales_orders WHERE source_opportunity_id = ? LIMIT 1",
        (opportunity_id,),
    ).fetchone():
        dependencies.append("pedidos")
    return dependencies


def result_opportunity_has_closure(opportunity):
    managements = opportunity.get("managements") if isinstance(opportunity.get("managements"), list) else []
    return any(
        not management.get("canceled")
        and text(management.get("stage")).lower() in {"cierre", "cierre de ventas"}
        and text(management.get("result"))
        for management in managements
    )


def sync_crm_result_migrations(conn, data):
    migrated = {
        text(item.get("crmOpportunityId")): item
        for item in read_result_opportunities(conn)
        if text(item.get("crmOpportunityId"))
    }
    if not migrated:
        return data, False

    changed = False
    now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    for opportunity in data.get("opportunities", []):
        result = migrated.get(text(opportunity.get("id")))
        if not result:
            continue
        if not opportunity.get("migratedToResults"):
            opportunity["migratedToResults"] = True
            opportunity["migratedAt"] = text(opportunity.get("migratedAt"), now)
            opportunity["resultOpportunityId"] = text(result.get("id"))
            opportunity["archived"] = True
            if text(opportunity.get("status")).lower() not in {"perdida", "cancelada", "anulada"}:
                opportunity["status"] = "Migrada"
                opportunity["archiveType"] = "migration"
                opportunity["archivedReason"] = "Migrada a Oportunidades / Gerencia"
                opportunity["archivedAt"] = text(opportunity.get("archivedAt"), opportunity["migratedAt"])
            changed = True
    return data, changed


def read_crm_data(conn):
    row = conn.execute("SELECT value FROM app_state WHERE key = 'crm_data'").fetchone()
    if not row:
        data = load_crm_seed()
        data, _ = sync_crm_result_migrations(conn, data)
        data, _ = sync_crm_result_closures(conn, data)
        write_crm_data(conn, data)
        return data
    data = json.loads(row["value"])
    data.setdefault("gestiones", [])
    data.setdefault("customers", [])
    data, changed = sync_crm_seed_updates(data)
    data, migration_changed = sync_crm_result_migrations(conn, data)
    data, closure_changed = sync_crm_result_closures(conn, data)
    changed = changed or migration_changed or closure_changed
    if changed:
        write_crm_data(conn, data)
    return data


def write_crm_data(conn, data):
    conn.execute("""
        INSERT INTO app_state (key, value, updated_at)
        VALUES ('crm_data', ?, CURRENT_TIMESTAMP)
        ON CONFLICT(key) DO UPDATE SET
            value = excluded.value,
            updated_at = CURRENT_TIMESTAMP
    """, (json.dumps(data, ensure_ascii=True),))


def public_crm_user(user):
    safe = dict(user or {})
    safe.pop("password", None)
    return safe


def crm_identity_key(value):
    source = text(value).lower()
    return " ".join("".join(char if char.isalnum() else " " for char in source).split())


def linked_crm_seller(data, account):
    identities = [
        text(account.get("name")),
        text(account.get("username")),
        text(account.get("email")),
        text(account.get("email")).split("@", 1)[0],
    ]
    for identity in identities:
        seller_id = CRM_SELLER_ACCOUNT_LINKS.get(crm_identity_key(identity))
        if seller_id:
            seller = next((item for item in data.get("users", []) if item.get("id") == seller_id), None)
            if seller:
                return seller

    combined_identity = " ".join(crm_identity_key(value) for value in identities)
    for seller in data.get("users", []):
        if seller.get("roleId") != "sales_exec":
            continue
        tokens = [token for token in crm_identity_key(seller.get("name")).split() if token]
        if len(tokens) >= 2 and all(token in combined_identity for token in tokens):
            return seller
    return None


def crm_customer_from_opportunity(opportunity):
    company = text(opportunity.get("company"), "Cliente")
    return {
        "id": opportunity.get("customerId") or crm_key(company),
        "legalName": company,
        "commercialName": company,
        "phone": text(opportunity.get("phone")),
        "email": "",
        "manager": text(opportunity.get("responsible") or opportunity.get("contact")),
        "businessLine": text(opportunity.get("segment"), "Por definir"),
        "address": text(opportunity.get("location")),
    }


def normalize_crm_user(payload, existing=None):
    existing = dict(existing or {})
    first_name = text(payload.get("firstName"), existing.get("firstName"))
    last_name = text(payload.get("lastName"), existing.get("lastName"))
    full_name = text(payload.get("name"), f"{first_name} {last_name}".strip() or existing.get("name"))
    email = text(payload.get("email"), existing.get("email")).lower()
    return {
        **existing,
        "name": full_name,
        "firstName": first_name,
        "lastName": last_name,
        "dui": text(payload.get("dui"), existing.get("dui")),
        "address": text(payload.get("address"), existing.get("address")),
        "roleId": text(payload.get("roleId"), existing.get("roleId") or "sales_exec"),
        "initials": text(payload.get("initials"), "".join(part[:1].upper() for part in full_name.split()[:2]) or "KV"),
        "phone": text(payload.get("phone"), existing.get("phone")),
        "email": email,
        "username": text(payload.get("username"), existing.get("username") or email).lower(),
        "password": text(payload.get("password"), existing.get("password") or "konfi123"),
        "territory": text(payload.get("territory"), existing.get("territory") or payload.get("address") or "Por definir"),
        "status": text(payload.get("status"), existing.get("status") or "Activo"),
    }


def duplicate_crm_user(data, payload, current_id=""):
    name = crm_identity_key(payload.get("name"))
    email = text(payload.get("email")).lower()
    username = text(payload.get("username") or payload.get("email")).lower()
    dui = text(payload.get("dui"))
    for user in data.get("users", []):
        if user.get("id") == current_id:
            continue
        if name and crm_identity_key(user.get("name")) == name:
            return True
        if email and text(user.get("email")).lower() == email:
            return True
        if username and text(user.get("username") or user.get("email")).lower() == username:
            return True
        if dui and text(user.get("dui")) == dui:
            return True
    return False


def normalize_crm_opportunity(payload, existing=None):
    existing = dict(existing or {})
    owner_id = text(payload.get("ownerId"), existing.get("ownerId") or "u2")
    now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    owner_changed = bool(existing) and owner_id != text(existing.get("ownerId"))
    try:
        stage_id = int(payload.get("stageId", existing.get("stageId", 1)) or 1)
    except (TypeError, ValueError):
        stage_id = 1
    try:
        estimated = float(payload.get("estimatedAmount", existing.get("estimatedAmount", 0)) or 0)
    except (TypeError, ValueError):
        estimated = 0
    return {
        **existing,
        "startDate": text(payload.get("startDate"), existing.get("startDate")),
        "deadline": text(payload.get("deadline"), existing.get("deadline")),
        "company": text(payload.get("company"), existing.get("company")),
        "product": text(payload.get("product"), existing.get("product")),
        "contact": text(payload.get("contact"), existing.get("contact") or payload.get("responsible")),
        "phone": text(payload.get("phone"), existing.get("phone")),
        "segment": text(payload.get("segment"), existing.get("segment")),
        "location": text(payload.get("location"), existing.get("location")),
        "stageId": max(1, min(8, stage_id)),
        "priority": text(payload.get("priority"), existing.get("priority") or "Media"),
        "temperature": text(payload.get("temperature"), existing.get("temperature") or "Tibio"),
        "estimatedAmount": max(0, estimated),
        "closePercent": max(0, min(100, crm_percent(payload.get("closePercent"), existing.get("closePercent", 0)))),
        "strategy": text(payload.get("strategy"), existing.get("strategy")),
        "status": text(payload.get("status"), existing.get("status") or "Vigente"),
        "responsible": text(payload.get("responsible"), existing.get("responsible") or payload.get("contact")),
        "ownerId": owner_id,
        "source": text(payload.get("source"), existing.get("source") or "CRM gerencia"),
        "createdAt": text(payload.get("createdAt"), existing.get("createdAt") or now),
        "assignedAt": now if not existing or owner_changed else text(existing.get("assignedAt"), existing.get("createdAt") or now),
        "nextAction": text(payload.get("nextAction"), existing.get("nextAction") or "Primer seguimiento"),
        "nextDate": text(payload.get("nextDate"), existing.get("nextDate") or payload.get("deadline")),
        "lastNote": text(payload.get("lastNote"), existing.get("lastNote") or payload.get("comment")),
        "comment": text(payload.get("comment"), existing.get("comment") or payload.get("lastNote")),
    }


def crm_audit_event(event_type, opportunity, request_user, reason="", related_id=""):
    now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    return {
        "id": f"audit-{int(time.time() * 1000)}",
        "type": event_type,
        "date": now,
        "reason": text(reason),
        "userId": text((request_user or {}).get("id")),
        "userName": text((request_user or {}).get("name"), "Sistema"),
        "previousStatus": text(opportunity.get("status"), "Vigente"),
        "amount": float(opportunity.get("estimatedAmount") or 0),
        "relatedOpportunityId": text(related_id),
    }


def result_opportunity_from_crm(data, opportunity, quotation=None):
    now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    local_now = datetime.now(ZoneInfo("America/El_Salvador"))
    today = local_now.strftime("%Y-%m-%d")
    quotation = quotation if isinstance(quotation, dict) else None
    quotation_id = text((quotation or {}).get("id"))
    result_id = f"result-{text(opportunity.get('id'))}{'-' + quotation_id if quotation_id else ''}"
    owner = next((item for item in data.get("users", []) if item.get("id") == opportunity.get("ownerId")), {})
    stage = next((item for item in data.get("stages", []) if item.get("id") == opportunity.get("stageId")), {})
    agenda_date = text(opportunity.get("nextDate"), opportunity.get("deadline") or opportunity.get("startDate") or today)
    date = today
    stage_name = text(stage.get("name"), "Prospeccion")
    note = text(opportunity.get("lastNote"), opportunity.get("comment"))
    customer = (quotation or {}).get("customerData") if isinstance((quotation or {}).get("customerData"), dict) else {}
    product_lines = [
        text(line.get("description")) for line in ((quotation or {}).get("lines") or [])
        if text(line.get("type")).lower() != "title" and text(line.get("description"))
    ]
    return {
        "id": result_id,
        "date": date,
        "time": local_now.strftime("%H:%M"),
        "company": text((quotation or {}).get("client"), opportunity.get("company") or "Cliente CRM"),
        "seller": text((quotation or {}).get("seller"), owner.get("name") or "Vendedor CRM"),
        "contact": text(customer.get("contactName"), opportunity.get("contact") or opportunity.get("responsible")),
        "phone": text(customer.get("phone"), opportunity.get("phone")),
        "segment": " · ".join(product_lines[:2]) or text(opportunity.get("segment"), opportunity.get("product")),
        "location": text(customer.get("address"), opportunity.get("location")),
        "stage": stage_name,
        "priority": text(opportunity.get("priority"), "Media"),
        "probability": text(opportunity.get("temperature"), "Tibio").lower(),
        "amount": round(int((quotation or {}).get("totalCents") or 0) / 100, 2) if quotation else float(opportunity.get("estimatedAmount") or 0),
        "nextAction": text(opportunity.get("nextAction"), "Primer seguimiento"),
        "agendaDate": agenda_date,
        "note": note,
        "crmOpportunityId": opportunity.get("id"),
        "quotationId": quotation_id,
        "quotationNumber": text((quotation or {}).get("number")),
        "quotationStatus": text((quotation or {}).get("status")),
        "quotationData": quotation or {},
        "migratedAt": now,
        "managements": [{
            "id": f"{result_id}-mgmt-001",
            "date": date,
            "time": local_now.strftime("%H:%M"),
            "stage": stage_name,
            "comment": f"Migrada desde CRM{': ' + note if note else '.'}",
        }],
    }


def sync_result_with_latest_quotation(conn, result):
    crm_id = text(result.get("crmOpportunityId"))
    if not crm_id:
        return False
    quotation_id = text(result.get("quotationId"))
    quotation = conn.execute(
        "SELECT * FROM quotations WHERE id = ? AND opportunity_id = ? LIMIT 1"
        if quotation_id else
        "SELECT * FROM quotations WHERE opportunity_id = ? ORDER BY datetime(updated_at) DESC, rowid DESC LIMIT 1",
        (quotation_id, crm_id) if quotation_id else (crm_id,),
    ).fetchone()
    if not quotation:
        return False
    snapshot = quotation_payload(quotation)
    changed = False
    linked_values = {
        "company": text(snapshot["client"], result.get("company")),
        "seller": text(snapshot["seller"], result.get("seller")),
        "amount": round(int(snapshot["totalCents"] or 0) / 100, 2),
        "quotationId": snapshot["id"],
        "quotationNumber": snapshot["number"],
        "quotationStatus": snapshot["status"],
        "quotationData": snapshot,
    }
    for key, value in linked_values.items():
        if result.get(key) != value:
            result[key] = value
            changed = True
    return changed


def ensure_quotation_result_opportunities(conn, data, opportunity, result_items):
    """Create or update one Gerencia opportunity for every eligible quotation."""
    crm_id = text(opportunity.get("id"))
    rows = conn.execute("""
        SELECT * FROM quotations
        WHERE opportunity_id = ? AND total_cents > 0 AND status NOT IN ('Rechazada', 'Vencida')
        ORDER BY datetime(created_at), rowid
    """, (crm_id,)).fetchall()
    quotations = [quotation_payload(row) for row in rows]
    if not quotations:
        existing = next((item for item in result_items if text(item.get("crmOpportunityId")) == crm_id), None)
        if existing:
            return [existing], False
        result = result_opportunity_from_crm(data, opportunity)
        result_items.insert(0, result)
        return [result], True

    linked = []
    changed = False
    legacy = next((
        item for item in result_items
        if text(item.get("crmOpportunityId")) == crm_id and not text(item.get("quotationId"))
    ), None)
    for index, quotation in enumerate(quotations):
        result = next((
            item for item in result_items
            if text(item.get("crmOpportunityId")) == crm_id
            and text(item.get("quotationId")) == text(quotation.get("id"))
        ), None)
        if not result and index == 0 and legacy:
            result = legacy
        if not result:
            result = result_opportunity_from_crm(data, opportunity, quotation)
            result_items.insert(0, result)
            changed = True
        if sync_result_with_latest_quotation(conn, result):
            changed = True
        linked.append(result)
    return linked, changed


def repair_missing_result_migrations(conn):
    """Rebuild Gerencia rows for CRM opportunities already marked as migrated."""
    crm_row = conn.execute("SELECT value FROM app_state WHERE key = 'crm_data'").fetchone()
    if not crm_row:
        return 0
    try:
        data = json.loads(crm_row["value"] or "{}")
    except json.JSONDecodeError:
        return 0
    if not isinstance(data, dict):
        return 0

    result_items = read_result_opportunities(conn)
    repaired = 0
    changed = False
    for opportunity in data.get("opportunities", []):
        crm_id = text(opportunity.get("id"))
        is_migrated = bool(opportunity.get("migratedToResults")) or text(opportunity.get("archiveType")).lower() == "migration"
        if not crm_id or not is_migrated:
            continue
        before_count = len(result_items)
        linked, linked_changed = ensure_quotation_result_opportunities(conn, data, opportunity, result_items)
        created_count = len(result_items) - before_count
        if linked:
            opportunity["resultOpportunityId"] = text(linked[0].get("id"))
            opportunity["resultOpportunityIds"] = [text(item.get("id")) for item in linked]
        repaired += max(0, created_count)
        changed = changed or linked_changed or created_count > 0

    if changed:
        write_result_opportunities(conn, result_items)
        write_crm_data(conn, data)
    return repaired


def repair_converted_result_opportunities(conn):
    """Keep converted quotations visible as won opportunities in Gerencia.

    A quotation can only be converted after its opportunity was closed as won.
    Therefore the converted quotation and order are authoritative recovery
    sources when the JSON opportunity row, or its closing management, was lost
    during an earlier client-side save.
    """
    crm_row = conn.execute("SELECT value FROM app_state WHERE key = 'crm_data'").fetchone()
    try:
        crm_data = json.loads(crm_row["value"] or "{}") if crm_row else {}
    except (json.JSONDecodeError, TypeError):
        crm_data = {}
    if not isinstance(crm_data, dict):
        crm_data = {}

    result_items = read_result_opportunities(conn)
    quotation_rows = conn.execute("""
        SELECT q.*,
               COALESCE(NULLIF(q.converted_order_id, ''), cso.id, '') AS recovered_order_id,
               COALESCE(NULLIF(q.converted_at, ''), cso.created_at, cso.order_date, '') AS recovered_converted_at
        FROM quotations q
        LEFT JOIN control_sales_orders cso
          ON cso.source_quotation_id = q.id
        WHERE q.converted_order_id <> '' OR cso.id IS NOT NULL
        ORDER BY datetime(COALESCE(NULLIF(q.converted_at, ''), cso.created_at, cso.order_date)), q.rowid
    """).fetchall()
    changed = False
    repaired = 0

    for row in quotation_rows:
        quotation = quotation_payload(row)
        quotation_id = text(quotation.get("id"))
        crm_id = text(row["opportunity_id"])
        result = next((
            item for item in result_items
            if text(item.get("quotationId")) == quotation_id
        ), None)

        if not result:
            crm_opportunity = next((
                item for item in crm_data.get("opportunities", [])
                if text(item.get("id")) == crm_id
            ), None)
            if crm_opportunity:
                result = result_opportunity_from_crm(crm_data, crm_opportunity, quotation)
            else:
                sibling = next((
                    item for item in result_items
                    if text(item.get("crmOpportunityId")) == crm_id
                ), None)
                if sibling:
                    result = {
                        **sibling,
                        "id": f"result-{crm_id or 'quotation'}-{quotation_id}",
                        "managements": [],
                    }
                else:
                    # The quotation/order pair is enough to rebuild the closed
                    # sale even when an older client save removed both the CRM
                    # source and its Gerencia row.
                    customer = quotation.get("customerData") if isinstance(quotation.get("customerData"), dict) else {}
                    product_lines = [
                        text(line.get("description")) for line in (quotation.get("lines") or [])
                        if text(line.get("type")).lower() != "title" and text(line.get("description"))
                    ]
                    result = {
                        "id": f"result-recovered-{quotation_id}",
                        "date": text(quotation.get("date"), time.strftime("%Y-%m-%d")),
                        "time": "",
                        "company": text(quotation.get("client"), "Cliente sin nombre"),
                        "seller": text(quotation.get("seller"), "Sin vendedor"),
                        "contact": text(customer.get("contactName")),
                        "phone": text(customer.get("phone")),
                        "segment": " · ".join(product_lines[:2]),
                        "location": text(customer.get("address")),
                        "stage": "Cierre de ventas",
                        "priority": "Media",
                        "probability": "tibio",
                        "amount": round(int(quotation.get("totalCents") or 0) / 100, 2),
                        "nextAction": "Pedido creado",
                        "agendaDate": text(quotation.get("date")),
                        "note": "Oportunidad recuperada desde la cotizacion convertida a pedido.",
                        "crmOpportunityId": crm_id,
                        "managements": [],
                        "recoveredFromConvertedQuotation": True,
                    }
            result_items.insert(0, result)
            repaired += 1
            changed = True

        linked_values = {
            "company": text(quotation.get("client"), result.get("company")),
            "seller": text(quotation.get("seller"), result.get("seller")),
            "amount": round(int(quotation.get("totalCents") or 0) / 100, 2),
            "quotationId": quotation_id,
            "quotationNumber": text(quotation.get("number")),
            "quotationStatus": text(quotation.get("status")),
            "quotationData": quotation,
        }
        for key, value in linked_values.items():
            if result.get(key) != value:
                result[key] = value
                changed = True

        managements = result.get("managements") if isinstance(result.get("managements"), list) else []
        closure = next((
            management for management in reversed(managements)
            if not management.get("canceled")
            and text(management.get("stage")).lower() in {"cierre", "cierre de ventas"}
            and text(management.get("result")).lower() == "ganado"
        ), None)
        converted_at = text(
            row["recovered_converted_at"],
            quotation.get("convertedAt") or quotation.get("date") or time.strftime("%Y-%m-%dT%H:%M:%S"),
        )
        normalized_converted_at = converted_at.replace(" ", "T")
        closed_date = normalized_converted_at.split("T", 1)[0]
        closed_time = normalized_converted_at.split("T", 1)[1][:5] if "T" in normalized_converted_at else ""
        if not closure:
            closure = {
                "id": f"recovered-win-{quotation_id}",
                "date": closed_date,
                "time": closed_time,
                "stage": "Cierre de ventas",
                "result": "ganado",
                "comment": "Cierre ganado conciliado desde la cotizacion convertida a pedido.",
                "recovered": True,
            }
            managements.append(closure)
            result["managements"] = managements
            repaired += 1
            changed = True

        recovery_values = {
            "stage": "Cierre de ventas",
            "trackingWin": {
                "managementId": text(closure.get("id")),
                "closedDate": text(closure.get("date"), closed_date),
                "closedTime": text(closure.get("time"), closed_time),
                "createdAt": normalized_converted_at,
            },
            "orderHandoff": {
                "status": "converted",
                "orderId": text(row["recovered_order_id"], quotation.get("convertedOrderId")),
                "quotationId": quotation_id,
                "convertedAt": normalized_converted_at,
            },
        }
        for key, value in recovery_values.items():
            if result.get(key) != value:
                result[key] = value
                changed = True

    if changed:
        write_result_opportunities(conn, result_items)
    return repaired


def upsert_crm_agenda(data, opportunity, payload):
    has_agenda = any(payload.get(key) for key in ["agendaDate", "agendaTime", "agendaType", "agendaPlace"])
    existing = next((item for item in data.get("agenda", []) if item.get("opportunityId") == opportunity.get("id")), None)
    if not has_agenda and not existing:
        return
    agenda_item = {
        "id": existing.get("id") if existing else f"ag-{int(time.time() * 1000)}",
        "date": text(payload.get("agendaDate"), (existing or {}).get("date") or opportunity.get("nextDate")),
        "time": text(payload.get("agendaTime"), (existing or {}).get("time") or "09:00"),
        "type": text(payload.get("agendaType"), (existing or {}).get("type") or "Seguimiento"),
        "opportunityId": opportunity.get("id"),
        "ownerId": opportunity.get("ownerId"),
        "status": text(payload.get("agendaStatus"), (existing or {}).get("status") or "Programada"),
        "place": text(payload.get("agendaPlace"), (existing or {}).get("place") or "Por definir"),
    }
    if existing:
        existing.update(agenda_item)
    else:
        data.setdefault("agenda", []).append(agenda_item)


def normalize_crm_gestion(payload, existing=None):
    existing = dict(existing or {})
    today = time.strftime("%Y-%m-%d")
    return {
        **existing,
        "agendaId": text(payload.get("agendaId"), existing.get("agendaId")),
        "opportunityId": text(payload.get("opportunityId"), existing.get("opportunityId")),
        "company": text(payload.get("company"), existing.get("company")),
        "ownerId": text(payload.get("ownerId"), existing.get("ownerId")),
        "stageId": whole_number(payload.get("stageId"), existing.get("stageId") or 0),
        "stageName": text(payload.get("stageName"), existing.get("stageName")),
        "type": text(payload.get("type"), existing.get("type") or "Llamada"),
        "date": text(payload.get("date"), existing.get("date") or today),
        "time": text(payload.get("time"), existing.get("time") or "09:00"),
        "status": text(payload.get("status"), existing.get("status") or "Programada"),
        "place": text(payload.get("place"), existing.get("place")),
        "locationLabel": text(payload.get("locationLabel"), existing.get("locationLabel") or payload.get("place")),
        "source": text(payload.get("source"), existing.get("source") or "CRM"),
        "note": text(payload.get("note"), existing.get("note")),
        "result": text(payload.get("result"), existing.get("result")),
        "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }


def build_crm_view_model(data, include_private=False):
    users = data.get("users", [])
    roles = data.get("roles", [])
    stages = data.get("stages", [])
    customers = data.get("customers", [])
    opportunities_raw = data.get("opportunities", [])
    users_by_id = {item.get("id"): item for item in users}
    stages_by_id = {item.get("id"): item for item in stages}
    customers_by_id = {item.get("id"): item for item in customers}
    opportunities = []
    for opportunity in opportunities_raw:
        customer_id = opportunity.get("customerId") or crm_key(opportunity.get("company"))
        amount = opportunity.get("estimatedAmount") or 0
        item = dict(opportunity)
        item["customerId"] = customer_id
        item["customer"] = customers_by_id.get(customer_id) or crm_customer_from_opportunity(opportunity)
        item["owner"] = public_crm_user(users_by_id.get(opportunity.get("ownerId"), {}))
        item["stage"] = stages_by_id.get(opportunity.get("stageId"), {})
        item["estimatedAmountLabel"] = crm_money(amount)
        opportunities.append(item)
    pipeline_opportunities = [
        item for item in opportunities
        if text(item.get("status"), "Vigente").lower() not in {"perdida", "cancelada"}
        and not item.get("archived")
    ]
    derived_customers = list({item["customer"]["id"]: item["customer"] for item in opportunities}.values())
    agenda = []
    for item in data.get("agenda", []):
        opportunity = next((opp for opp in opportunities if opp.get("id") == item.get("opportunityId")), None)
        if not opportunity:
            continue
        row = dict(item)
        row["opportunity"] = opportunity
        row["owner"] = public_crm_user(users_by_id.get(item.get("ownerId"), {}))
        agenda.append(row)
    agenda.sort(key=lambda row: f"{row.get('date', '')} {row.get('time', '')}")
    gestiones = []
    for item in data.get("gestiones", []):
        row = dict(item)
        row["opportunity"] = next((opp for opp in opportunities if opp.get("id") == item.get("opportunityId")), None)
        row["owner"] = public_crm_user(users_by_id.get(item.get("ownerId"), {}))
        gestiones.append(row)
    gestiones.sort(key=lambda row: f"{row.get('date', '')} {row.get('time', '')}", reverse=True)
    total_pipeline = sum(float(item.get("estimatedAmount") or 0) for item in pipeline_opportunities)
    closed = len([item for item in pipeline_opportunities if int(item.get("stageId") or 0) >= 6])
    hot = len([item for item in pipeline_opportunities if item.get("temperature") == "Caliente"])
    pipeline = []
    for stage in stages:
        stage_opportunities = [item for item in pipeline_opportunities if item.get("stageId") == stage.get("id")]
        amount = sum(float(item.get("estimatedAmount") or 0) for item in stage_opportunities)
        pipeline.append({**stage, "count": len(stage_opportunities), "amount": amount, "amountLabel": crm_money(amount), "opportunities": stage_opportunities})
    return {
        "company": data.get("company", "KONFI"),
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "roles": roles,
        "users": users if include_private else [public_crm_user(user) for user in users],
        "customers": customers or derived_customers,
        "stages": stages,
        "forms": data.get("forms", []),
        "opportunities": opportunities,
        "agenda": agenda,
        "gestiones": gestiones,
        "resultWins": data.get("resultWins", []),
        "pipeline": pipeline,
        "kpis": {
            "totalProspects": len(pipeline_opportunities),
            "totalPipeline": total_pipeline,
            "totalPipelineLabel": crm_money(total_pipeline),
            "hotOpportunities": hot,
            "scheduledMeetings": len([item for item in agenda if item.get("status") == "Programada"]),
            "inProgressVisits": len([item for item in agenda if item.get("status") == "En visita"]),
            "completedVisits": len([item for item in agenda if item.get("status") == "Realizada"]),
            "closeRate": round((closed / len(pipeline_opportunities)) * 100) if pipeline_opportunities else 0,
            "nps": data.get("postSales", {}).get("nps", 0),
            "openClaims": data.get("postSales", {}).get("openClaims", 0),
        },
    }


def default_permissions_for_role(role):
    if role == "operativos":
        return [
            f"comercializacion:{section}"
            for section in ["crm", "crm-seguimiento"]
        ]
    if role == "jefaturas":
        return [
            *[f"comercializacion:{section}" for section in AREA_SECTION_KEYS["comercializacion"]],
            "financiera:resultados",
            "financiera:resultados-pedidos",
            "financiera:resultados-cuentas-por-cobrar",
            "financiera:resultados-ordenes-de-pedido",
            *ADMIN_CONSOLIDATED_PERMISSION_KEYS,
        ]
    return list(
        ALL_PERMISSIONS
        if role == "gerencias"
        else [*ALL_OPERATIONAL_PERMISSIONS, *ADMIN_CONSOLIDATED_PERMISSION_KEYS]
    )


def normalize_permissions(value, role):
    if isinstance(value, str):
        try:
            value = json.loads(value)
        except json.JSONDecodeError:
            value = None
    if not isinstance(value, list):
        return default_permissions_for_role(role)
    valid = set(ALL_PERMISSIONS)
    permissions = [item for item in value if item in valid]
    return list(dict.fromkeys(permissions))


def normalize_user(data, index=0):
    item = dict(data or {})
    email = str(item.get("email") or "").strip().lower()
    username = str(item.get("username") or (email.split("@")[0] if email else f"usuario{index + 1}")).strip().lower()
    raw_role = item.get("role")
    migrated_role = LEGACY_ROLE_MAP.get(raw_role, raw_role)
    role = migrated_role if migrated_role in VALID_ROLES else "gerencias"
    admin = bool(item.get("admin")) or email == ADMIN_EMAIL
    permissions_customized = bool(item.get("permissionsCustomized") or item.get("permissions_customized"))
    permissions = (
        list(ALL_PERMISSIONS)
        if admin or role == "gerencias"
        else normalize_permissions(item.get("permissions"), role)
        if permissions_customized
        else default_permissions_for_role(role)
    )
    return {
        "id": item.get("id") or f"user-{index + 1}",
        "name": item.get("name") or username or "Usuario",
        "username": username,
        "email": email,
        "role": "gerencias" if admin else role,
        "password": item.get("password") or "admin123",
        "permissions": permissions,
        "permissionsCustomized": permissions_customized,
        "admin": admin,
    }


def user_payload(row):
    data = dict(row)
    raw_role = data.get("role")
    migrated_role = LEGACY_ROLE_MAP.get(raw_role, raw_role)
    data["role"] = migrated_role if migrated_role in VALID_ROLES else "gerencias"
    data["permissionsCustomized"] = bool(data.pop("permissions_customized", 0))
    data["permissions"] = (
        normalize_permissions(data.get("permissions"), data["role"])
        if data["permissionsCustomized"]
        else default_permissions_for_role(data["role"])
    )
    data["admin"] = bool(data.get("admin")) or data.get("email") == ADMIN_EMAIL
    if data["admin"] or data["role"] == "gerencias":
        data["role"] = "gerencias"
        data["permissions"] = list(ALL_PERMISSIONS)
    return data


def upsert_user(conn, user):
    normalized = normalize_user(user)
    conn.execute("""
        INSERT INTO users (id, name, username, email, role, password, permissions, permissions_customized, admin)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            name = excluded.name,
            username = excluded.username,
            email = excluded.email,
            role = excluded.role,
            password = excluded.password,
            permissions = excluded.permissions,
            permissions_customized = excluded.permissions_customized,
            admin = excluded.admin
    """, (
        normalized["id"],
        normalized["name"],
        normalized["username"],
        normalized["email"],
        normalized["role"],
        normalized["password"],
        json.dumps(normalized["permissions"], ensure_ascii=True),
        1 if normalized["permissionsCustomized"] else 0,
        1 if normalized["admin"] else 0,
    ))
    return normalized


def patch_user(conn, user_id, changes):
    row = conn.execute("""
        SELECT id, name, username, email, role, password,
               permissions, permissions_customized, admin
        FROM users WHERE id = ? LIMIT 1
    """, (user_id,)).fetchone()
    if not row:
        return None
    merged = dict(user_payload(row))
    for key in ("name", "username", "email", "role", "permissions", "permissionsCustomized", "admin"):
        if key in changes:
            merged[key] = changes[key]
    password = str(changes.get("password") or "")
    merged["password"] = password if password else row["password"]
    merged["id"] = user_id
    return upsert_user(conn, merged)


def connect():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def decimal_number(value, fallback=0):
    try:
        return round(float(value if value not in (None, "") else fallback), 2)
    except (TypeError, ValueError):
        return round(float(fallback or 0), 2)


def normalize_receivable(data, existing=None):
    current = dict(existing or {})
    payload = dict(data or {})
    invoice_amount = decimal_number(payload.get("invoiceAmount"), current.get("invoiceAmount", 0))
    payments = decimal_number(payload.get("payments"), current.get("payments", 0))
    credit_notes = decimal_number(payload.get("creditNotes"), current.get("creditNotes", 0))
    provided_balance = payload.get("balance")
    balance = decimal_number(
        provided_balance,
        current.get("balance", invoice_amount - payments - credit_notes),
    )
    return {
        "id": text(payload.get("id"), current.get("id") or f"cxc-{int(time.time() * 1000)}"),
        "invoiceNumber": text(payload.get("invoiceNumber"), current.get("invoiceNumber") or ""),
        "referenceNumber": text(payload.get("referenceNumber"), current.get("referenceNumber") or ""),
        "customerCode": text(payload.get("customerCode"), current.get("customerCode") or ""),
        "customerName": text(payload.get("customerName"), current.get("customerName") or ""),
        "description": text(payload.get("description"), current.get("description") or ""),
        "invoiceDate": text(payload.get("invoiceDate"), current.get("invoiceDate") or ""),
        "dueDate": text(payload.get("dueDate"), current.get("dueDate") or ""),
        "daysOutstanding": whole_number(payload.get("daysOutstanding"), current.get("daysOutstanding", 0)),
        "invoiceAmount": invoice_amount,
        "payments": payments,
        "creditNotes": credit_notes,
        "balance": balance,
        "projectId": text(payload.get("projectId"), current.get("projectId") or ""),
        "seller": text(payload.get("seller"), current.get("seller") or ""),
        "documentNumber": text(payload.get("documentNumber"), current.get("documentNumber") or ""),
        "address": text(payload.get("address"), current.get("address") or ""),
        "source": text(payload.get("source"), current.get("source") or "manual"),
        "createdAt": text(payload.get("createdAt"), current.get("createdAt") or time.strftime("%Y-%m-%dT%H:%M:%S")),
        "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
    }


def receivable_payload(row):
    return {
        "id": row["id"],
        "invoiceNumber": row["invoice_number"],
        "referenceNumber": row["reference_number"],
        "customerCode": row["customer_code"],
        "customerName": row["customer_name"],
        "description": row["description"],
        "invoiceDate": row["invoice_date"],
        "dueDate": row["due_date"],
        "daysOutstanding": row["days_outstanding"],
        "invoiceAmount": row["invoice_amount"],
        "payments": row["payments"],
        "creditNotes": row["credit_notes"],
        "balance": row["balance"],
        "projectId": row["project_id"],
        "seller": row["seller"],
        "documentNumber": row["document_number"],
        "address": row["address"],
        "source": row["source"],
        "createdAt": row["created_at"],
        "updatedAt": row["updated_at"],
    }


def upsert_receivable(conn, data, existing=None):
    item = normalize_receivable(data, existing)
    conn.execute("""
        INSERT INTO accounts_receivable (
            id, invoice_number, reference_number, customer_code, customer_name, description,
            invoice_date, due_date, days_outstanding, invoice_amount, payments, credit_notes,
            balance, project_id, seller, document_number, address, source, created_at, updated_at
        ) VALUES (
            :id, :invoiceNumber, :referenceNumber, :customerCode, :customerName, :description,
            :invoiceDate, :dueDate, :daysOutstanding, :invoiceAmount, :payments, :creditNotes,
            :balance, :projectId, :seller, :documentNumber, :address, :source, :createdAt, :updatedAt
        )
        ON CONFLICT(id) DO UPDATE SET
            invoice_number = excluded.invoice_number,
            reference_number = excluded.reference_number,
            customer_code = excluded.customer_code,
            customer_name = excluded.customer_name,
            description = excluded.description,
            invoice_date = excluded.invoice_date,
            due_date = excluded.due_date,
            days_outstanding = excluded.days_outstanding,
            invoice_amount = excluded.invoice_amount,
            payments = excluded.payments,
            credit_notes = excluded.credit_notes,
            balance = excluded.balance,
            project_id = excluded.project_id,
            seller = excluded.seller,
            document_number = excluded.document_number,
            address = excluded.address,
            source = excluded.source,
            updated_at = excluded.updated_at
    """, item)
    return item


def normalize_financial_order(data, existing=None):
    current = dict(existing or {})
    payload = dict(data or {})
    now = time.strftime("%Y-%m-%dT%H:%M:%S")
    return {
        "id": text(payload.get("id"), current.get("id") or f"pedido-{time.time_ns()}"),
        "sourceKey": text(payload.get("sourceKey"), current.get("sourceKey") or ""),
        "source": text(payload.get("source"), current.get("source") or "manual"),
        "sourceOpportunityId": text(payload.get("sourceOpportunityId"), current.get("sourceOpportunityId") or ""),
        "number": text(payload.get("number"), current.get("number") or ""),
        "month": text(payload.get("month"), current.get("month") or ""),
        "year": text(payload.get("year"), current.get("year") or ""),
        "date": text(payload.get("date"), current.get("date") or ""),
        "seller": text(payload.get("seller"), current.get("seller") or ""),
        "sale": decimal_number(payload.get("sale"), current.get("sale", 0)),
        "orderNumber": text(payload.get("orderNumber"), current.get("orderNumber") or ""),
        "invoice": text(payload.get("invoice"), current.get("invoice") or ""),
        "conditions": text(payload.get("conditions"), current.get("conditions") or ""),
        "client": text(payload.get("client"), current.get("client") or ""),
        "clientType": text(payload.get("clientType"), current.get("clientType") or ""),
        "strategy": text(payload.get("strategy"), current.get("strategy") or ""),
        "management": text(payload.get("management"), current.get("management") or ""),
        "country": text(payload.get("country"), current.get("country") or ""),
        "department": text(payload.get("department"), current.get("department") or ""),
        "deleted": bool(payload.get("deleted", current.get("deleted", False))),
        "createdBy": text(payload.get("createdBy"), current.get("createdBy") or "Sistema Gerencial"),
        "updatedBy": text(payload.get("updatedBy"), current.get("updatedBy") or payload.get("createdBy") or "Sistema Gerencial"),
        "createdAt": text(payload.get("createdAt"), current.get("createdAt") or now),
        "updatedAt": now,
    }


def financial_order_payload(row):
    return {
        "id": row["id"],
        "sourceKey": row["source_key"],
        "source": row["source"],
        "sourceOpportunityId": row["source_opportunity_id"],
        "number": row["number"],
        "month": row["month"],
        "year": row["year"],
        "date": row["date"],
        "seller": row["seller"],
        "sale": row["sale"],
        "orderNumber": row["order_number"],
        "invoice": row["invoice"],
        "conditions": row["conditions"],
        "client": row["client"],
        "clientType": row["client_type"],
        "strategy": row["strategy"],
        "management": row["management"],
        "country": row["country"],
        "department": row["department"],
        "deleted": bool(row["deleted"]),
        "createdBy": row["created_by"],
        "updatedBy": row["updated_by"],
        "createdAt": row["created_at"],
        "updatedAt": row["updated_at"],
    }


def next_financial_order_number(conn):
    highest_number = 0
    for row in conn.execute("SELECT number FROM financial_orders").fetchall():
        raw_number = text(row["number"]).strip()
        if raw_number.isdigit():
            highest_number = max(highest_number, int(raw_number))
    return str(highest_number + 1)


def upsert_financial_order(conn, data, existing=None):
    item = normalize_financial_order(data, existing)
    conn.execute("""
        INSERT INTO financial_orders (
            id, source_key, source, source_opportunity_id, number, month, year, date, seller, sale,
            order_number, invoice, conditions, client, client_type, strategy,
            management, country, department, deleted, created_by, updated_by,
            created_at, updated_at
        ) VALUES (
            :id, :sourceKey, :source, :sourceOpportunityId, :number, :month, :year, :date, :seller, :sale,
            :orderNumber, :invoice, :conditions, :client, :clientType, :strategy,
            :management, :country, :department, :deleted, :createdBy, :updatedBy,
            :createdAt, :updatedAt
        )
        ON CONFLICT(id) DO UPDATE SET
            source_key = excluded.source_key,
            source = excluded.source,
            source_opportunity_id = excluded.source_opportunity_id,
            number = excluded.number,
            month = excluded.month,
            year = excluded.year,
            date = excluded.date,
            seller = excluded.seller,
            sale = excluded.sale,
            order_number = excluded.order_number,
            invoice = excluded.invoice,
            conditions = excluded.conditions,
            client = excluded.client,
            client_type = excluded.client_type,
            strategy = excluded.strategy,
            management = excluded.management,
            country = excluded.country,
            department = excluded.department,
            deleted = excluded.deleted,
            updated_by = excluded.updated_by,
            updated_at = excluded.updated_at
    """, item)
    return item


def normalize_purchase_order(data, existing=None):
    current = dict(existing or {})
    payload = dict(data or {})
    now = time.strftime("%Y-%m-%dT%H:%M:%S")
    return {
        "id": text(payload.get("id"), current.get("id") or f"orden-pedido-{time.time_ns()}"),
        "sourceKey": text(payload.get("sourceKey"), current.get("sourceKey") or ""),
        "source": text(payload.get("source"), current.get("source") or "manual"),
        "orderNumber": text(payload.get("orderNumber"), current.get("orderNumber") or ""),
        "invoiceType": text(payload.get("invoiceType"), current.get("invoiceType") or ""),
        "customerCode": text(payload.get("customerCode"), current.get("customerCode") or ""),
        "customerName": text(payload.get("customerName"), current.get("customerName") or ""),
        "description": text(payload.get("description"), current.get("description") or ""),
        "entryDate": text(payload.get("entryDate"), current.get("entryDate") or ""),
        "dueDate": text(payload.get("dueDate"), current.get("dueDate") or ""),
        "amount": decimal_number(payload.get("amount"), current.get("amount", 0)),
        "advance": decimal_number(payload.get("advance"), current.get("advance", 0)),
        "payment": decimal_number(payload.get("payment"), current.get("payment", 0)),
        "remaining": decimal_number(payload.get("remaining"), current.get("remaining", 0)),
        "balancePaymentDate": text(payload.get("balancePaymentDate"), current.get("balancePaymentDate") or ""),
        "address": text(payload.get("address"), current.get("address") or ""),
        "status": text(payload.get("status"), current.get("status") or "Proceso"),
        "productionManager": text(payload.get("productionManager"), current.get("productionManager") or "Sin asignar"),
        "createdBy": text(payload.get("createdBy"), current.get("createdBy") or "Sistema Gerencial"),
        "updatedBy": text(payload.get("updatedBy"), current.get("updatedBy") or payload.get("createdBy") or "Sistema Gerencial"),
        "createdAt": text(payload.get("createdAt"), current.get("createdAt") or now),
        "updatedAt": now,
    }


def purchase_order_payload(row):
    return {
        "id": row["id"], "sourceKey": row["source_key"], "source": row["source"],
        "orderNumber": row["order_number"], "invoiceType": row["invoice_type"],
        "customerCode": row["customer_code"], "customerName": row["customer_name"],
        "description": row["description"], "entryDate": row["entry_date"], "dueDate": row["due_date"],
        "amount": row["amount"], "advance": row["advance"], "payment": row["payment"],
        "remaining": row["remaining"], "balancePaymentDate": row["balance_payment_date"],
        "address": row["address"], "status": row["status"], "productionManager": row["production_manager"],
        "createdBy": row["created_by"], "updatedBy": row["updated_by"],
        "createdAt": row["created_at"], "updatedAt": row["updated_at"],
    }


def upsert_purchase_order(conn, data, existing=None):
    item = normalize_purchase_order(data, existing)
    conn.execute("""
        INSERT INTO purchase_orders (
            id, source_key, source, order_number, invoice_type, customer_code, customer_name,
            description, entry_date, due_date, amount, advance, payment, remaining,
            balance_payment_date, address, status, production_manager, created_by, updated_by,
            created_at, updated_at
        ) VALUES (
            :id, :sourceKey, :source, :orderNumber, :invoiceType, :customerCode, :customerName,
            :description, :entryDate, :dueDate, :amount, :advance, :payment, :remaining,
            :balancePaymentDate, :address, :status, :productionManager, :createdBy, :updatedBy,
            :createdAt, :updatedAt
        )
        ON CONFLICT(id) DO UPDATE SET
            source_key=excluded.source_key, source=excluded.source, order_number=excluded.order_number,
            invoice_type=excluded.invoice_type, customer_code=excluded.customer_code,
            customer_name=excluded.customer_name, description=excluded.description,
            entry_date=excluded.entry_date, due_date=excluded.due_date, amount=excluded.amount,
            advance=excluded.advance, payment=excluded.payment, remaining=excluded.remaining,
            balance_payment_date=excluded.balance_payment_date, address=excluded.address,
            status=excluded.status, production_manager=excluded.production_manager,
            updated_by=excluded.updated_by, updated_at=excluded.updated_at
    """, item)
    return item


def seed_accounts_receivable(conn):
    migration_key = "migration_accounts_receivable_matrix_20260718_v1"
    if conn.execute("SELECT 1 FROM app_state WHERE key = ?", (migration_key,)).fetchone():
        return
    records = []
    try:
        records = json.loads(ACCOUNTS_RECEIVABLE_SEED_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        print(f"No se pudo cargar la matriz de cuentas por cobrar: {error}")
    for record in records if isinstance(records, list) else []:
        upsert_receivable(conn, record)
    conn.execute(
        "INSERT INTO app_state (key, value) VALUES (?, ?)",
        (migration_key, json.dumps({"count": len(records), "source": ACCOUNTS_RECEIVABLE_SEED_PATH.name})),
    )


def seed_purchase_orders(conn):
    migration_key = "migration_purchase_orders_matrix_20260720_v1"
    if conn.execute("SELECT 1 FROM app_state WHERE key = ?", (migration_key,)).fetchone():
        return
    records = []
    try:
        records = json.loads(PURCHASE_ORDERS_SEED_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        print(f"No se pudo cargar la matriz de ordenes de pedido: {error}")
    for record in records if isinstance(records, list) else []:
        upsert_purchase_order(conn, record)
    conn.execute(
        "INSERT INTO app_state (key, value) VALUES (?, ?)",
        (migration_key, json.dumps({"count": len(records), "source": PURCHASE_ORDERS_SEED_PATH.name})),
    )


def recover_purchase_orders_if_empty(conn):
    """Restore the bundled snapshot once when a persisted database loses every order."""
    recovery_key = "recovery_purchase_orders_empty_20260724_v1"
    if conn.execute("SELECT 1 FROM app_state WHERE key = ?", (recovery_key,)).fetchone():
        return
    current_count = conn.execute("SELECT COUNT(*) AS count FROM purchase_orders").fetchone()["count"]
    if current_count:
        return
    try:
        records = json.loads(PURCHASE_ORDERS_SEED_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        print(f"No se pudo recuperar el respaldo de ordenes de pedido: {error}")
        return
    if not isinstance(records, list) or not records:
        return
    for record in records:
        upsert_purchase_order(conn, record)
    conn.execute(
        "INSERT INTO app_state (key, value) VALUES (?, ?)",
        (
            recovery_key,
            json.dumps({
                "count": len(records),
                "source": PURCHASE_ORDERS_SEED_PATH.name,
                "recoveredAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
            }),
        ),
    )
    print(f"Recuperadas {len(records)} ordenes de pedido desde {PURCHASE_ORDERS_SEED_PATH.name}")


def control_sales_cents(value, field="monto"):
    if isinstance(value, bool) or value in (None, ""):
        raise ValueError(f"{field} es requerido")
    try:
        amount = Decimal(str(value))
    except (InvalidOperation, ValueError):
        raise ValueError(f"{field} no es valido")
    return int((amount * 100).quantize(Decimal("1"), rounding=ROUND_HALF_UP))


def control_sales_reconciliation_snapshot(financial_order, total_cents):
    if not financial_order:
        return 0, 0
    try:
        sale = Decimal(str(financial_order["sale"] or 0))
    except (InvalidOperation, ValueError, TypeError, KeyError, IndexError):
        sale = Decimal("0")
    expected_total_cents = int(
        (sale * 100).quantize(Decimal("1"), rounding=ROUND_HALF_UP)
    )
    return expected_total_cents, int(total_cents or 0) - expected_total_cents


def control_sales_quantity(value):
    try:
        quantity = Decimal(str(value).strip().replace(",", "."))
    except (InvalidOperation, ValueError):
        raise ValueError("Cantidad no valida")
    if quantity <= 0:
        raise ValueError("La cantidad debe ser mayor que cero")
    return format(quantity.normalize(), "f")


def control_sales_order_payload(conn, row, include_audit=False):
    detail_rows = conn.execute("""
        SELECT * FROM control_sales_details
        WHERE order_id = ? AND active = 1
        ORDER BY sequence, created_at, id
    """, (row["id"],)).fetchall()
    try:
        proforma_data = json.loads(
            row["proforma_data"] if "proforma_data" in row.keys() else "{}"
        )
        if not isinstance(proforma_data, dict):
            proforma_data = {}
    except (json.JSONDecodeError, TypeError):
        proforma_data = {}
    subtotal_cents = sum(
        int(detail["line_total_cents"] or 0) - int(detail["vat_cents"] or 0)
        for detail in detail_rows
    )
    vat_total_cents = sum(int(detail["vat_cents"] or 0) for detail in detail_rows)
    perception_cents = max(
        0, int(row["total_cents"] or 0) - subtotal_cents - vat_total_cents
    )
    item = {
        "id": row["id"], "externalId": row["external_id"], "source": row["source"],
        "financialOrderId": row["financial_order_id"] if "financial_order_id" in row.keys() else "",
        "sourceOpportunityId": row["source_opportunity_id"] if "source_opportunity_id" in row.keys() else "",
        "sourceQuotationId": row["source_quotation_id"] if "source_quotation_id" in row.keys() else "",
        "expectedTotalCents": row["expected_total_cents"] if "expected_total_cents" in row.keys() else 0,
        "varianceCents": row["variance_cents"] if "variance_cents" in row.keys() else 0,
        "number": row["order_number"], "date": row["order_date"], "seller": row["seller"],
        "client": row["client"], "status": row["status"], "documentType": row["document_type"],
        "totalCents": row["total_cents"], "subtotalCents": subtotal_cents,
        "vatTotalCents": vat_total_cents, "perceptionCents": perception_cents,
        "proformaData": proforma_data,
        "declaredTotalCents": row["declared_total_cents"], "archived": bool(row["archived"]),
        "qualityStatus": row["quality_status"], "anomalies": json.loads(row["anomalies"] or "[]"),
        "sourceRowStart": row["source_row_start"], "sourceRowEnd": row["source_row_end"],
        "notes": row["notes"], "createdBy": row["created_by"], "updatedBy": row["updated_by"],
        "createdAt": row["created_at"], "updatedAt": row["updated_at"],
        "commercialApprovalStatus": row["commercial_approval_status"] if "commercial_approval_status" in row.keys() else "Pendiente",
        "commercialApprovedBy": row["commercial_approved_by"] if "commercial_approved_by" in row.keys() else "",
        "commercialApprovedAt": row["commercial_approved_at"] if "commercial_approved_at" in row.keys() else "",
        "commercialApprovalNote": row["commercial_approval_note"] if "commercial_approval_note" in row.keys() else "",
        "financeApprovalStatus": row["finance_approval_status"] if "finance_approval_status" in row.keys() else "Pendiente",
        "financeApprovedBy": row["finance_approved_by"] if "finance_approved_by" in row.keys() else "",
        "financeApprovedAt": row["finance_approved_at"] if "finance_approved_at" in row.keys() else "",
        "financeApprovalNote": row["finance_approval_note"] if "finance_approval_note" in row.keys() else "",
        "details": [{
            "id": detail["id"], "externalId": detail["external_id"],
            "groupExternalId": detail["group_external_id"], "sequence": detail["sequence"],
            "product": detail["product"], "size": detail["size"], "quantity": detail["quantity"],
            "unitPriceCents": detail["unit_price_cents"], "vatCents": detail["vat_cents"],
            "lineTotalCents": detail["line_total_cents"], "originalTotalCents": detail["original_total_cents"],
            "notes": detail["notes"], "sourceRow": detail["source_row"],
            "qualityStatus": detail["quality_status"], "reviewRequired": bool(detail["review_required"]),
            "anomalies": json.loads(detail["anomalies"] or "[]"),
        } for detail in detail_rows],
    }
    if include_audit:
        item["audit"] = [dict(entry) for entry in conn.execute("""
            SELECT action, user_name AS userName, created_at AS createdAt, summary
            FROM control_sales_audit WHERE order_id = ? ORDER BY created_at DESC, id DESC
        """, (row["id"],)).fetchall()]
    return item


def control_sales_validate(data, existing=None):
    current = dict(existing or {})
    number = text(data.get("number"), current.get("number") or "")
    seller = text(data.get("seller"), current.get("seller") or "")
    order_date = text(data.get("date"), current.get("date") or "")
    client = text(data.get("client"), current.get("client") or "")
    if not all((number, seller, order_date, client)):
        raise ValueError("Numero, vendedor, fecha y cliente son requeridos")
    document_type = text(data.get("documentType"), current.get("documentType") or "CF").upper()
    if document_type not in ("CF", "CCF"):
        raise ValueError("Tipo de comprobante no valido")
    current_proforma = current.get("proformaData") or {}
    raw_proforma = data.get("proformaData")
    if raw_proforma is None:
        raw_proforma = current_proforma
    if not isinstance(raw_proforma, dict):
        raise ValueError("Los datos de proforma no son validos")
    strategy = text(
        raw_proforma.get("strategy"),
        current_proforma.get("strategy") or "",
    )
    allowed_strategies = ("", "Retención", "Expansión", "Atracción", "Recuperación")
    if strategy not in allowed_strategies:
        raise ValueError("Estrategia de venta no valida")
    proforma_data = {
        "commercialName": text(raw_proforma.get("commercialName"), current_proforma.get("commercialName") or client),
        "legalName": text(raw_proforma.get("legalName"), current_proforma.get("legalName") or ""),
        "businessActivity": text(raw_proforma.get("businessActivity"), current_proforma.get("businessActivity") or ""),
        "contactName": text(raw_proforma.get("contactName"), current_proforma.get("contactName") or ""),
        "phone": text(raw_proforma.get("phone"), current_proforma.get("phone") or ""),
        "address": text(raw_proforma.get("address"), current_proforma.get("address") or ""),
        "email": text(raw_proforma.get("email"), current_proforma.get("email") or ""),
        "taxId": text(raw_proforma.get("taxId"), current_proforma.get("taxId") or ""),
        "registrationNumber": text(raw_proforma.get("registrationNumber"), current_proforma.get("registrationNumber") or ""),
        "taxpayerType": text(raw_proforma.get("taxpayerType"), current_proforma.get("taxpayerType") or ""),
        "deliveryDate": text(raw_proforma.get("deliveryDate"), current_proforma.get("deliveryDate") or ""),
        "paymentTerms": text(raw_proforma.get("paymentTerms"), current_proforma.get("paymentTerms") or ""),
        "perceptionEnabled": bool(raw_proforma.get("perceptionEnabled", current_proforma.get("perceptionEnabled", False))),
        "strategy": strategy,
        "customerCode": text(raw_proforma.get("customerCode"), current_proforma.get("customerCode") or ""),
        "generalNotes": text(raw_proforma.get("generalNotes"), current_proforma.get("generalNotes") or ""),
    }
    raw_details = data.get("details")
    if not isinstance(raw_details, list) or not raw_details:
        raise ValueError("La orden debe contener al menos una linea")
    details = []
    subtotal_cents = 0
    vat_total_cents = 0
    for index, raw in enumerate(raw_details, start=1):
        product = text(raw.get("product"))
        if not product:
            raise ValueError(f"Producto requerido en la linea {index}")
        quantity_text = control_sales_quantity(raw.get("quantity"))
        quantity = Decimal(quantity_text)
        if raw.get("unitPrice") is None and raw.get("unitPriceCents") is not None:
            try:
                unit_price_cents = int(raw.get("unitPriceCents"))
            except (TypeError, ValueError):
                raise ValueError(f"Precio unitario de la linea {index} no es valido")
        else:
            unit_price_cents = control_sales_cents(raw.get("unitPrice"), f"Precio unitario de la linea {index}")
        if unit_price_cents < 0:
            raise ValueError("El precio unitario debe ser mayor o igual a cero")
        base_cents = int((quantity * Decimal(unit_price_cents)).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
        vat_cents = int((Decimal(base_cents) * Decimal("0.13")).quantize(Decimal("1"), rounding=ROUND_HALF_UP)) if document_type == "CCF" else 0
        line_total_cents = base_cents + vat_cents
        subtotal_cents += base_cents
        vat_total_cents += vat_cents
        details.append({
            "id": text(raw.get("id"), f"cvd-{uuid.uuid4()}"), "sequence": index,
            "product": product, "size": text(raw.get("size")), "quantity": quantity_text,
            "unitPriceCents": unit_price_cents, "vatCents": vat_cents,
            "lineTotalCents": line_total_cents, "notes": text(raw.get("notes")),
        })
    perception_cents = (
        int((Decimal(subtotal_cents) * Decimal("0.01")).quantize(
            Decimal("1"), rounding=ROUND_HALF_UP
        ))
        if proforma_data["perceptionEnabled"] else 0
    )
    total_cents = subtotal_cents + vat_total_cents + perception_cents
    return {
        "number": number, "seller": seller, "date": order_date, "client": client,
        "status": text(data.get("status"), current.get("status") or "Activa"),
        "documentType": document_type, "details": details, "totalCents": total_cents,
        "subtotalCents": subtotal_cents, "vatTotalCents": vat_total_cents,
        "perceptionCents": perception_cents, "proformaData": proforma_data,
    }


def save_control_sales_order(conn, data, existing_row=None):
    existing = control_sales_order_payload(conn, existing_row) if existing_row else None
    item = control_sales_validate(data, existing)
    order_id = existing_row["id"] if existing_row else f"cv-{uuid.uuid4()}"
    financial_order_id = text(
        data.get("financialOrderId"),
        existing.get("financialOrderId", "") if existing else "",
    )
    source_opportunity_id = text(
        data.get("sourceOpportunityId"),
        existing.get("sourceOpportunityId", "") if existing else "",
    )
    source_quotation_id = text(
        data.get("sourceQuotationId"),
        existing.get("sourceQuotationId", "") if existing else "",
    )
    expected_total_cents = int(existing.get("expectedTotalCents") or 0) if existing else 0
    variance_cents = int(existing.get("varianceCents") or 0) if existing else 0
    if source_quotation_id:
        quotation = conn.execute(
            "SELECT id, opportunity_id, converted_order_id FROM quotations WHERE id = ?",
            (source_quotation_id,),
        ).fetchone()
        if not quotation:
            raise ValueError("La cotizacion seleccionada ya no existe")
        if quotation["converted_order_id"] and quotation["converted_order_id"] != order_id:
            raise ValueError("Esta cotizacion ya fue convertida a pedido")
        source_opportunity_id = source_opportunity_id or text(quotation["opportunity_id"])
        if not existing_row:
            source_ids = {
                value for value in (
                    text(source_opportunity_id),
                    text(quotation["opportunity_id"]),
                ) if value
            }
            crm_data = read_crm_data(conn)
            is_won_opportunity = any(
                source_ids.intersection({
                    value for value in (
                        text(win.get("id")),
                        text(win.get("opportunityId")),
                        text(win.get("crmOpportunityId")),
                    ) if value
                })
                for win in crm_data.get("resultWins", [])
            )
            if not is_won_opportunity:
                raise ValueError(
                    "La cotizacion solo puede convertirse en pedido desde Seguimiento, "
                    "despues de confirmar la oportunidad como ganada"
                )
    if financial_order_id:
        financial_order = conn.execute(
            "SELECT * FROM financial_orders WHERE id = ? AND deleted = 0",
            (financial_order_id,),
        ).fetchone()
        if not financial_order:
            raise ValueError("El pedido seleccionado ya no existe o fue eliminado")
        financial_order_date = text(financial_order["date"])
        previous_financial_order_id = (
            text(existing.get("financialOrderId")) if existing else ""
        )
        is_new_financial_order_link = (
            not existing_row or financial_order_id != previous_financial_order_id
        )
        if (
            is_new_financial_order_link
            and financial_order_date < CONTROL_SALES_FINANCIAL_ORDER_CUTOFF
        ):
            raise ValueError("Solo se pueden ingresar pedidos desde julio de 2026")
        linked = conn.execute("""
            SELECT id FROM control_sales_orders
            WHERE financial_order_id = ? AND id <> ?
            LIMIT 1
        """, (financial_order_id, order_id)).fetchone()
        if linked:
            raise ValueError("Este pedido ya fue ingresado en Control de Ventas")
        item["number"] = text(financial_order["number"])
        item["seller"] = text(financial_order["seller"])
        item["client"] = text(financial_order["client"])
        expected_total_cents, variance_cents = control_sales_reconciliation_snapshot(
            financial_order, item["totalCents"]
        )
    elif not existing_row and not source_opportunity_id:
        raise ValueError("Selecciona un pedido pendiente antes de crear la orden")
    duplicate = conn.execute("""
        SELECT id FROM control_sales_orders
        WHERE lower(order_number) = lower(?) AND source = 'manual' AND id <> ?
    """, (item["number"], order_id)).fetchone()
    if duplicate:
        raise sqlite3.IntegrityError("Numero de orden duplicado")
    now = time.strftime("%Y-%m-%dT%H:%M:%S")
    actor = text(data.get("updatedBy") or data.get("createdBy"), "Sistema Gerencial")
    proforma_json = json.dumps(item["proformaData"], ensure_ascii=False)
    if existing_row:
        conn.execute("""
            UPDATE control_sales_orders SET financial_order_id=?, source_opportunity_id=?, source_quotation_id=?, order_number=?, order_date=?, seller=?, client=?, status=?,
                document_type=?, total_cents=?, expected_total_cents=?, variance_cents=?,
                proforma_data=?, commercial_approval_status='Pendiente', commercial_approved_by='', commercial_approved_at='', commercial_approval_note='',
                finance_approval_status='Pendiente', finance_approved_by='', finance_approved_at='', finance_approval_note='', updated_by=?, updated_at=? WHERE id=?
        """, (financial_order_id, source_opportunity_id, source_quotation_id, item["number"], item["date"], item["seller"], item["client"], item["status"], item["documentType"], item["totalCents"], expected_total_cents, variance_cents, proforma_json, actor, now, order_id))
        conn.execute("UPDATE control_sales_details SET active = 0, updated_at = ? WHERE order_id = ?", (now, order_id))
        action = "edicion"
    else:
        conn.execute("""
            INSERT INTO control_sales_orders (
                id, source, financial_order_id, source_opportunity_id, source_quotation_id, order_number, order_date, seller, client, status, document_type, total_cents,
                expected_total_cents, variance_cents, proforma_data, created_by, updated_by, created_at, updated_at
            ) VALUES (?, 'manual', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (order_id, financial_order_id, source_opportunity_id, source_quotation_id, item["number"], item["date"], item["seller"], item["client"], item["status"], item["documentType"], item["totalCents"], expected_total_cents, variance_cents, proforma_json, actor, actor, now, now))
        action = "creacion"
    for detail in item["details"]:
        conn.execute("""
            INSERT INTO control_sales_details (
                id, order_id, sequence, product, size, quantity, unit_price_cents, vat_cents,
                line_total_cents, notes, active, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
            ON CONFLICT(id) DO UPDATE SET sequence=excluded.sequence, product=excluded.product,
                size=excluded.size, quantity=excluded.quantity, unit_price_cents=excluded.unit_price_cents,
                vat_cents=excluded.vat_cents, line_total_cents=excluded.line_total_cents,
                notes=excluded.notes, active=1, updated_at=excluded.updated_at
        """, (detail["id"], order_id, detail["sequence"], detail["product"], detail["size"], detail["quantity"], detail["unitPriceCents"], detail["vatCents"], detail["lineTotalCents"], detail["notes"], now, now))
    reconciliation_summary = (
        f" · Pedido ${expected_total_cents / 100:,.2f}"
        f" · Detalle ${item['totalCents'] / 100:,.2f}"
        f" · Diferencia ${variance_cents / 100:,.2f}"
        if financial_order_id else ""
    )
    conn.execute("INSERT INTO control_sales_audit (order_id, action, user_name, created_at, summary) VALUES (?, ?, ?, ?, ?)",
                 (order_id, action, actor, now, f"Orden {item['number']} · {len(item['details'])} lineas{reconciliation_summary}"))
    if source_quotation_id:
        conn.execute("""
            UPDATE quotations
            SET status='Convertida', converted_order_id=?, converted_at=?, updated_by=?, updated_at=?
            WHERE id=?
        """, (order_id, now, actor, now, source_quotation_id))
    row = conn.execute("SELECT * FROM control_sales_orders WHERE id = ?", (order_id,)).fetchone()
    return control_sales_order_payload(conn, row, include_audit=True)


def quotation_payload(row):
    try:
        customer = json.loads(row["customer_data"] or "{}")
        if not isinstance(customer, dict):
            customer = {}
    except (json.JSONDecodeError, TypeError):
        customer = {}
    try:
        lines = json.loads(row["lines"] or "[]")
        if not isinstance(lines, list):
            lines = []
    except (json.JSONDecodeError, TypeError):
        lines = []
    return {
        "id": row["id"], "opportunityId": row["opportunity_id"],
        "number": row["quotation_number"], "date": row["quotation_date"],
        "validDays": row["valid_days"], "seller": row["seller"],
        "client": row["client"], "status": row["status"],
        "customerData": customer, "paymentTerms": row["payment_terms"],
        "deliveryTerms": row["delivery_terms"], "warrantyNote": row["warranty_note"],
        "commercialNotes": row["commercial_notes"], "specialSizesNote": row["special_sizes_note"],
        "subtotalCents": row["subtotal_cents"], "vatCents": row["vat_cents"],
        "totalCents": row["total_cents"], "lines": lines,
        "convertedOrderId": row["converted_order_id"], "convertedAt": row["converted_at"],
        "createdBy": row["created_by"], "updatedBy": row["updated_by"],
        "createdAt": row["created_at"], "updatedAt": row["updated_at"],
    }


def quotation_validate(data, existing=None):
    current = dict(existing or {})
    opportunity_id = text(data.get("opportunityId"), current.get("opportunityId") or "")
    quote_date = text(data.get("date"), current.get("date") or time.strftime("%Y-%m-%d"))
    seller = text(data.get("seller"), current.get("seller") or "")
    client = text(data.get("client"), current.get("client") or "")
    if not all((opportunity_id, quote_date, seller, client)):
        raise ValueError("Oportunidad, fecha, vendedor y cliente son requeridos")
    try:
        valid_days = max(1, min(365, int(data.get("validDays", current.get("validDays", 30)) or 30)))
    except (TypeError, ValueError):
        raise ValueError("La vigencia de la oferta no es valida")
    raw_customer = data.get("customerData", current.get("customerData") or {})
    if not isinstance(raw_customer, dict):
        raise ValueError("Los datos del cliente no son validos")
    customer = {
        "commercialName": text(raw_customer.get("commercialName"), client),
        "legalName": text(raw_customer.get("legalName")),
        "contactName": text(raw_customer.get("contactName")),
        "phone": text(raw_customer.get("phone")),
        "email": text(raw_customer.get("email")),
        "address": text(raw_customer.get("address")),
        "businessActivity": text(raw_customer.get("businessActivity")),
        "taxId": text(raw_customer.get("taxId")),
        "registrationNumber": text(raw_customer.get("registrationNumber")),
        "taxpayerType": text(raw_customer.get("taxpayerType")),
        "strategy": text(raw_customer.get("strategy")),
        "customerCode": text(raw_customer.get("customerCode")),
        "sellerPhone": text(raw_customer.get("sellerPhone")),
        "sellerEmail": text(raw_customer.get("sellerEmail")),
        "sellerRole": text(raw_customer.get("sellerRole"), "Ejecutivo/a de ventas"),
    }
    raw_lines = data.get("lines")
    if not isinstance(raw_lines, list) or not raw_lines:
        raise ValueError("La cotizacion debe contener al menos una linea")
    allowed_statuses = {"Borrador", "Enviada", "Aprobada", "Rechazada", "Vencida", "Convertida"}
    status = text(data.get("status"), current.get("status") or "Borrador")
    if status not in allowed_statuses:
        raise ValueError("Estado de cotizacion no valido")
    lines = []
    subtotal_cents = 0
    product_line_count = 0
    for index, raw in enumerate(raw_lines, start=1):
        description = text(raw.get("description") or raw.get("product"))
        if not description:
            raise ValueError(f"Descripcion requerida en la linea {index}")
        if text(raw.get("type")).lower() == "title":
            lines.append({
                "id": text(raw.get("id"), f"quote-line-{uuid.uuid4()}"),
                "sequence": index, "type": "title", "title": description,
                "description": description, "size": "", "quantity": "0",
                "unitPriceCents": 0, "lineTotalCents": 0, "notes": "",
            })
            continue
        product_line_count += 1
        quantity_text = control_sales_quantity(raw.get("quantity"))
        quantity = Decimal(quantity_text)
        unit_price_cents = control_sales_cents(raw.get("unitPrice"), f"Precio unitario de la linea {index}")
        if unit_price_cents < 0:
            raise ValueError("El precio unitario debe ser mayor o igual a cero")
        if status in {"Enviada", "Aprobada", "Convertida"} and unit_price_cents <= 0:
            raise ValueError(f"Precio unitario requerido en la linea {index} para completar la cotizacion")
        line_total_cents = int((quantity * Decimal(unit_price_cents)).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
        subtotal_cents += line_total_cents
        lines.append({
            "id": text(raw.get("id"), f"quote-line-{uuid.uuid4()}"),
            "sequence": index, "description": description,
            "size": text(raw.get("size")), "quantity": quantity_text,
            "unitPriceCents": unit_price_cents, "lineTotalCents": line_total_cents,
            "notes": text(raw.get("notes")),
        })
    if product_line_count < 1:
        raise ValueError("La cotizacion debe contener al menos una linea de producto")
    vat_cents = int((Decimal(subtotal_cents) * Decimal("0.13")).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
    return {
        "opportunityId": opportunity_id, "date": quote_date, "validDays": valid_days,
        "seller": seller, "client": client, "status": status, "customerData": customer,
        "paymentTerms": text(data.get("paymentTerms"), current.get("paymentTerms") or "50% de anticipo - 50% contra entrega"),
        "deliveryTerms": text(data.get("deliveryTerms"), current.get("deliveryTerms") or "30 dias habiles posterior a la orden de compra"),
        "warrantyNote": text(data.get("warrantyNote"), current.get("warrantyNote") or "Todos nuestros productos estan garantizados y elaborados con altos estandares de calidad."),
        "commercialNotes": text(data.get("commercialNotes"), current.get("commercialNotes") or "Precios unitarios no incluyen IVA"),
        "specialSizesNote": text(data.get("specialSizesNote"), current.get("specialSizesNote") or "Tallas especiales arriba de XXL tienen costo adicional"),
        "subtotalCents": subtotal_cents, "vatCents": vat_cents,
        "totalCents": subtotal_cents + vat_cents, "lines": lines,
    }


def sync_opportunity_amount_from_latest_quotation(conn, opportunity_id):
    opportunity_id = text(opportunity_id)
    if not opportunity_id:
        return None
    data = read_crm_data(conn)
    opportunity = next((item for item in data.get("opportunities", []) if text(item.get("id")) == opportunity_id), None)
    if not opportunity:
        return None
    quotation = conn.execute("""
        SELECT id, total_cents
        FROM quotations
        WHERE opportunity_id = ? AND total_cents > 0
        ORDER BY datetime(updated_at) DESC, rowid DESC
        LIMIT 1
    """, (opportunity_id,)).fetchone()
    if quotation:
        if opportunity.get("quotationReferenceAmount") is None:
            opportunity["quotationReferenceAmount"] = float(opportunity.get("estimatedAmount") or 0)
        next_amount = round(int(quotation["total_cents"] or 0) / 100, 2)
        opportunity["latestQuotationId"] = text(quotation["id"])
    elif opportunity.get("quotationReferenceAmount") is not None:
        next_amount = float(opportunity.get("quotationReferenceAmount") or 0)
        opportunity.pop("latestQuotationId", None)
    else:
        return None
    opportunity["estimatedAmount"] = next_amount
    opportunity["quotationAmountUpdatedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    write_crm_data(conn, data)

    results = read_result_opportunities(conn)
    changed = False
    for result in results:
        if text(result.get("crmOpportunityId")) != opportunity_id:
            continue
        if sync_result_with_latest_quotation(conn, result):
            changed = True
    if opportunity.get("migratedToResults"):
        linked, linked_changed = ensure_quotation_result_opportunities(conn, data, opportunity, results)
        if linked:
            opportunity["resultOpportunityId"] = text(linked[0].get("id"))
            opportunity["resultOpportunityIds"] = [text(item.get("id")) for item in linked]
            write_crm_data(conn, data)
        changed = changed or linked_changed
    if changed:
        write_result_opportunities(conn, results)
    return next_amount


def save_quotation(conn, data, existing_row=None):
    existing = quotation_payload(existing_row) if existing_row else None
    item = quotation_validate(data, existing)
    quote_id = existing_row["id"] if existing_row else f"quote-{uuid.uuid4()}"
    # Identificador técnico aleatorio: evita correlativos y no se muestra al usuario.
    number = existing["number"] if existing else f"Q-{uuid.uuid4()}"
    actor = text(data.get("updatedBy") or data.get("createdBy"), "Sistema Gerencial")
    now = time.strftime("%Y-%m-%dT%H:%M:%S")
    converted_order_id = existing.get("convertedOrderId", "") if existing else ""
    converted_at = existing.get("convertedAt", "") if existing else ""
    conn.execute("""
        INSERT INTO quotations (
            id, opportunity_id, quotation_number, quotation_date, valid_days, seller, client, status,
            customer_data, payment_terms, delivery_terms, warranty_note, commercial_notes,
            special_sizes_note, subtotal_cents, vat_cents, total_cents, lines,
            converted_order_id, converted_at, created_by, updated_by, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            opportunity_id=excluded.opportunity_id, quotation_date=excluded.quotation_date,
            valid_days=excluded.valid_days, seller=excluded.seller, client=excluded.client,
            status=excluded.status, customer_data=excluded.customer_data,
            payment_terms=excluded.payment_terms, delivery_terms=excluded.delivery_terms,
            warranty_note=excluded.warranty_note, commercial_notes=excluded.commercial_notes,
            special_sizes_note=excluded.special_sizes_note, subtotal_cents=excluded.subtotal_cents,
            vat_cents=excluded.vat_cents, total_cents=excluded.total_cents, lines=excluded.lines,
            updated_by=excluded.updated_by, updated_at=excluded.updated_at
    """, (
        quote_id, item["opportunityId"], number, item["date"], item["validDays"],
        item["seller"], item["client"], item["status"],
        json.dumps(item["customerData"], ensure_ascii=False), item["paymentTerms"],
        item["deliveryTerms"], item["warrantyNote"], item["commercialNotes"],
        item["specialSizesNote"], item["subtotalCents"], item["vatCents"], item["totalCents"],
        json.dumps(item["lines"], ensure_ascii=False), converted_order_id, converted_at,
        existing.get("createdBy", actor) if existing else actor, actor,
        existing.get("createdAt", now) if existing else now, now,
    ))
    sync_opportunity_amount_from_latest_quotation(conn, item["opportunityId"])
    row = conn.execute("SELECT * FROM quotations WHERE id=?", (quote_id,)).fetchone()
    return quotation_payload(row)


def seed_control_sales(conn):
    try:
        seed = json.loads(CONTROL_SALES_SEED_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        print(f"No se pudo cargar Control de Ventas: {error}")
        return
    version = text(seed.get("version"), "control-sales-v1")
    now = time.strftime("%Y-%m-%dT%H:%M:%S")
    for order in seed.get("orders", []):
        external_id = text(order.get("externalId"))
        order_id = f"cv-import-{external_id}"
        total_cents = sum(int(detail.get("lineTotalCents") or 0) for detail in order.get("details", []))
        conn.execute("""
            INSERT INTO control_sales_orders (
                id, external_id, source, order_number, order_date, seller, client, status,
                total_cents, declared_total_cents, quality_status, anomalies, source_row_start,
                source_row_end, notes, created_by, updated_by, created_at, updated_at
            ) VALUES (?, ?, 'importado', ?, ?, ?, ?, 'Histórica', ?, ?, ?, ?, ?, ?, ?, 'Importación Excel', 'Importación Excel', ?, ?)
            ON CONFLICT(external_id) DO NOTHING
        """, (order_id, external_id, text(order.get("number")), text(order.get("date")), text(order.get("seller")), text(order.get("client")), total_cents, order.get("declaredTotalCents"), text(order.get("qualityStatus")), json.dumps(order.get("anomalies") or [], ensure_ascii=False), text(order.get("sourceRowStart")), text(order.get("sourceRowEnd")), text(order.get("notes")), now, now))
        stored = conn.execute("SELECT id FROM control_sales_orders WHERE external_id = ?", (external_id,)).fetchone()
        if not stored:
            continue
        conn.execute("""
            INSERT INTO control_sales_audit (order_id, action, user_name, created_at, summary)
            SELECT ?, 'importacion', 'Importación Excel', ?, ?
            WHERE NOT EXISTS (
                SELECT 1 FROM control_sales_audit WHERE order_id = ? AND action = 'importacion'
            )
        """, (stored["id"], now, f"Importación histórica · orden {text(order.get('number'))}", stored["id"]))
        for detail in order.get("details", []):
            detail_external_id = text(detail.get("externalId"))
            conn.execute("""
                INSERT INTO control_sales_details (
                    id, external_id, order_id, group_external_id, sequence, product, size, quantity,
                    unit_price_cents, vat_cents, line_total_cents, original_total_cents, notes,
                    source_row, quality_status, review_required, anomalies, active, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
                ON CONFLICT(external_id) DO NOTHING
            """, (f"cvd-import-{detail_external_id}", detail_external_id, stored["id"], text(detail.get("groupExternalId")), int(detail.get("sequence") or 0), text(detail.get("product")), text(detail.get("size")), text(detail.get("quantity")), detail.get("unitPriceCents"), int(detail.get("vatCents") or 0), int(detail.get("lineTotalCents") or 0), detail.get("originalTotalCents"), text(detail.get("notes")), text(detail.get("sourceRow")), text(detail.get("qualityStatus")), int(bool(detail.get("reviewRequired"))), json.dumps(detail.get("anomalies") or [], ensure_ascii=False), now, now))
    conn.execute("""
        INSERT INTO app_state (key, value, updated_at) VALUES ('control_sales_import', ?, CURRENT_TIMESTAMP)
        ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=CURRENT_TIMESTAMP
    """, (json.dumps({"version": version, "orders": seed.get("orderCount"), "details": seed.get("detailCount")}),))


def grant_control_sales_permissions(conn):
    permissions_to_grant = ["operaciones:resultados-control-ventas", "comercializacion:autorizacion-pedidos"]
    for row in conn.execute("SELECT id, role, permissions FROM users").fetchall():
        try:
            permissions = json.loads(row["permissions"] or "[]")
        except json.JSONDecodeError:
            permissions = []
        if row["role"] in {"gerencias", "jefaturas"}:
            permissions.extend(item for item in permissions_to_grant if item not in permissions)
            conn.execute("UPDATE users SET permissions = ? WHERE id = ?", (json.dumps(permissions, ensure_ascii=True), row["id"]))


def grant_purchase_order_permissions(conn):
    migration_key = "migration_purchase_order_permissions_v1"
    if conn.execute("SELECT 1 FROM app_state WHERE key = ?", (migration_key,)).fetchone():
        return
    permission = "financiera:resultados-ordenes-de-pedido"
    for row in conn.execute("SELECT id, permissions FROM users").fetchall():
        try:
            permissions = json.loads(row["permissions"] or "[]")
        except json.JSONDecodeError:
            permissions = []
        if "financiera:resultados-pedidos" in permissions and permission not in permissions:
            permissions.append(permission)
            conn.execute("UPDATE users SET permissions = ? WHERE id = ?", (json.dumps(permissions, ensure_ascii=True), row["id"]))
    conn.execute("INSERT INTO app_state (key, value) VALUES (?, ?)", (migration_key, "completed"))


def migrate_consolidated_permissions(conn):
    migration_key = "migration_admin_consolidated_risks_requests_v1"
    if conn.execute("SELECT 1 FROM app_state WHERE key = ?", (migration_key,)).fetchone():
        return
    rows = conn.execute("""
        SELECT id, role, permissions, permissions_customized
        FROM users
    """).fetchall()
    for row in rows:
        try:
            raw_permissions = json.loads(row["permissions"] or "[]")
        except json.JSONDecodeError:
            raw_permissions = []
        raw_permissions = raw_permissions if isinstance(raw_permissions, list) else []
        permissions = normalize_permissions(raw_permissions, row["role"])
        if any(item.endswith(":riesgos") for item in raw_permissions):
            permissions.append("administracion:riesgos")
        if any(item.endswith(":solicitudes") for item in raw_permissions):
            permissions.append("administracion:solicitudes")
        permissions = list(dict.fromkeys(item for item in permissions if item in ALL_PERMISSIONS))
        conn.execute(
            "UPDATE users SET permissions = ? WHERE id = ?",
            (json.dumps(permissions, ensure_ascii=True), row["id"]),
        )
    conn.execute(
        "INSERT INTO app_state (key, value) VALUES (?, ?)",
        (migration_key, "completed"),
    )


def grant_johanna_minutes_permissions(conn):
    migration_key = "migration_johanna_actas_tabs_v1"
    if conn.execute("SELECT 1 FROM app_state WHERE key = ?", (migration_key,)).fetchone():
        return
    rows = conn.execute("""
        SELECT id, name, username, email, role, permissions
        FROM users
    """).fetchall()
    updated = False
    for row in rows:
        identity = " ".join([
            text(row["name"]).lower(),
            text(row["username"]).lower(),
            text(row["email"]).lower(),
        ])
        if not (("johanna" in identity or "johana" in identity) and "coreas" in identity):
            continue
        permissions = normalize_permissions(row["permissions"], row["role"])
        permissions = list(dict.fromkeys([*permissions, *ADMIN_MINUTE_PERMISSION_KEYS]))
        conn.execute(
            "UPDATE users SET permissions = ?, permissions_customized = 1 WHERE id = ?",
            (json.dumps(permissions, ensure_ascii=True), row["id"]),
        )
        updated = True
    if updated:
        conn.execute(
            "INSERT INTO app_state (key, value) VALUES (?, ?)",
            (migration_key, "completed"),
        )


def purge_luis_valladares_test_flow_once(conn):
    """Remove the existing Luis Valladares test flow once, preserving his user account."""
    marker_key = "maintenance.purge-luis-valladares-flow.2026-08-07.v1"
    if conn.execute("SELECT 1 FROM app_state WHERE key = ?", (marker_key,)).fetchone():
        return

    target = crm_identity_key("Luis Valladares")
    matches_luis = lambda value: crm_identity_key(value) == target
    crm = read_crm_data(conn)
    seller_ids = {
        text(user.get("id")) for user in crm.get("users", [])
        if matches_luis(user.get("name"))
    }
    crm_opportunities = [
        item for item in crm.get("opportunities", [])
        if text(item.get("ownerId")) in seller_ids
        or matches_luis(item.get("seller"))
        or matches_luis(item.get("owner"))
        or matches_luis(item.get("responsible"))
    ]
    opportunity_ids = {
        text(value) for item in crm_opportunities
        for value in (item.get("id"), item.get("resultOpportunityId"), item.get("crmOpportunityId"))
        if text(value)
    }

    quotation_rows = conn.execute("SELECT id, opportunity_id, converted_order_id FROM quotations WHERE lower(seller) = lower(?) OR lower(created_by) = lower(?)", ("Luis Valladares", "Luis Valladares")).fetchall()
    if opportunity_ids:
        placeholders = ",".join("?" for _ in opportunity_ids)
        quotation_rows += conn.execute(
            f"SELECT id, opportunity_id, converted_order_id FROM quotations WHERE opportunity_id IN ({placeholders})",
            tuple(opportunity_ids),
        ).fetchall()
    quotation_ids = {text(row["id"]) for row in quotation_rows}

    order_rows = conn.execute("SELECT id, financial_order_id, source_opportunity_id, source_quotation_id FROM control_sales_orders WHERE lower(seller) = lower(?) OR lower(created_by) = lower(?)", ("Luis Valladares", "Luis Valladares")).fetchall()
    relation_clauses = []
    relation_values = []
    for column, values in (("source_opportunity_id", opportunity_ids), ("source_quotation_id", quotation_ids)):
        if values:
            relation_clauses.append(f"{column} IN ({','.join('?' for _ in values)})")
            relation_values.extend(values)
    if relation_clauses:
        order_rows += conn.execute(
            "SELECT id, financial_order_id, source_opportunity_id, source_quotation_id FROM control_sales_orders WHERE " + " OR ".join(relation_clauses),
            tuple(relation_values),
        ).fetchall()
    order_ids = {text(row["id"]) for row in order_rows}
    financial_order_ids = {text(row["financial_order_id"]) for row in order_rows if text(row["financial_order_id"])}

    result_rows = read_result_opportunities(conn)
    removed_result_ids = {
        text(item.get("id")) for item in result_rows
        if matches_luis(item.get("seller"))
        or text(item.get("crmOpportunityId")) in opportunity_ids
        or text(item.get("quotationId")) in quotation_ids
    }
    opportunity_ids.update(removed_result_ids)

    if order_ids:
        placeholders = ",".join("?" for _ in order_ids)
        conn.execute(f"DELETE FROM control_sales_audit WHERE order_id IN ({placeholders})", tuple(order_ids))
        conn.execute(f"DELETE FROM control_sales_details WHERE order_id IN ({placeholders})", tuple(order_ids))
        conn.execute(f"DELETE FROM control_sales_orders WHERE id IN ({placeholders})", tuple(order_ids))
    if quotation_ids:
        placeholders = ",".join("?" for _ in quotation_ids)
        conn.execute(f"DELETE FROM quotations WHERE id IN ({placeholders})", tuple(quotation_ids))
    if financial_order_ids:
        placeholders = ",".join("?" for _ in financial_order_ids)
        conn.execute(f"DELETE FROM financial_orders WHERE id IN ({placeholders})", tuple(financial_order_ids))
    conn.execute("DELETE FROM financial_orders WHERE lower(seller) = lower(?) OR lower(created_by) = lower(?)", ("Luis Valladares", "Luis Valladares"))
    deleted_purchase_orders = conn.execute("DELETE FROM purchase_orders WHERE lower(created_by) = lower(?)", ("Luis Valladares",)).rowcount

    crm["opportunities"] = [item for item in crm.get("opportunities", []) if text(item.get("id")) not in opportunity_ids]
    crm["agenda"] = [item for item in crm.get("agenda", []) if text(item.get("opportunityId")) not in opportunity_ids and text(item.get("ownerId")) not in seller_ids]
    crm["gestiones"] = [item for item in crm.get("gestiones", []) if text(item.get("opportunityId")) not in opportunity_ids and text(item.get("ownerId")) not in seller_ids]
    crm["resultWins"] = [item for item in crm.get("resultWins", []) if text(item.get("id")) not in opportunity_ids and text(item.get("crmOpportunityId")) not in opportunity_ids and not matches_luis(item.get("seller"))]
    write_crm_data(conn, crm)
    write_result_opportunities(conn, [item for item in result_rows if text(item.get("id")) not in removed_result_ids])

    summary = {
        "seller": "Luis Valladares",
        "opportunities": len(crm_opportunities),
        "quotations": len(quotation_ids),
        "orders": len(order_ids),
        "financialOrders": len(financial_order_ids),
        "resultOpportunities": len(removed_result_ids),
        "purchaseOrders": deleted_purchase_orders,
        "executedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    conn.execute("INSERT INTO app_state (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)", (marker_key, json.dumps(summary, ensure_ascii=True)))
    print(f"Limpieza de prueba Luis Valladares completada: {summary}")


def init_db():
    with connect() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL,
                role TEXT NOT NULL,
                password TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)
        columns = {row["name"] for row in conn.execute("PRAGMA table_info(users)").fetchall()}
        if "permissions" not in columns:
            conn.execute("ALTER TABLE users ADD COLUMN permissions TEXT DEFAULT '[]'")
        if "admin" not in columns:
            conn.execute("ALTER TABLE users ADD COLUMN admin INTEGER DEFAULT 0")
        if "permissions_customized" not in columns:
            conn.execute("ALTER TABLE users ADD COLUMN permissions_customized INTEGER DEFAULT 0")
        conn.execute("""
            CREATE TABLE IF NOT EXISTS app_state (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS presence (
                user_id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                role TEXT NOT NULL,
                last_seen REAL NOT NULL
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS minutes (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                area TEXT NOT NULL,
                date TEXT NOT NULL,
                body TEXT NOT NULL,
                created_by TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS accounts_receivable (
                id TEXT PRIMARY KEY,
                invoice_number TEXT NOT NULL,
                reference_number TEXT DEFAULT '',
                customer_code TEXT DEFAULT '',
                customer_name TEXT NOT NULL,
                description TEXT DEFAULT '',
                invoice_date TEXT DEFAULT '',
                due_date TEXT DEFAULT '',
                days_outstanding INTEGER DEFAULT 0,
                invoice_amount REAL DEFAULT 0,
                payments REAL DEFAULT 0,
                credit_notes REAL DEFAULT 0,
                balance REAL DEFAULT 0,
                project_id TEXT DEFAULT '',
                seller TEXT DEFAULT '',
                document_number TEXT DEFAULT '',
                address TEXT DEFAULT '',
                source TEXT DEFAULT 'manual',
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.execute("CREATE INDEX IF NOT EXISTS idx_accounts_receivable_customer ON accounts_receivable(customer_name)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_accounts_receivable_invoice ON accounts_receivable(invoice_number)")
        conn.execute("""
            CREATE TABLE IF NOT EXISTS financial_orders (
                id TEXT PRIMARY KEY,
                source_key TEXT DEFAULT '',
                source TEXT DEFAULT 'manual',
                source_opportunity_id TEXT DEFAULT '',
                number TEXT NOT NULL,
                month TEXT NOT NULL,
                year TEXT NOT NULL,
                date TEXT NOT NULL,
                seller TEXT NOT NULL,
                sale REAL DEFAULT 0,
                order_number TEXT DEFAULT '',
                invoice TEXT DEFAULT '',
                conditions TEXT DEFAULT '',
                client TEXT NOT NULL,
                client_type TEXT DEFAULT '',
                strategy TEXT DEFAULT '',
                management TEXT DEFAULT '',
                country TEXT DEFAULT '',
                department TEXT DEFAULT '',
                deleted INTEGER DEFAULT 0,
                created_by TEXT DEFAULT 'Sistema Gerencial',
                updated_by TEXT DEFAULT 'Sistema Gerencial',
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)
        financial_order_columns = {row["name"] for row in conn.execute("PRAGMA table_info(financial_orders)").fetchall()}
        if "source_opportunity_id" not in financial_order_columns:
            conn.execute("ALTER TABLE financial_orders ADD COLUMN source_opportunity_id TEXT DEFAULT ''")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_financial_orders_number ON financial_orders(number)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_financial_orders_date ON financial_orders(date)")
        conn.execute("""
            CREATE TABLE IF NOT EXISTS purchase_orders (
                id TEXT PRIMARY KEY,
                source_key TEXT DEFAULT '',
                source TEXT DEFAULT 'manual',
                order_number TEXT NOT NULL,
                invoice_type TEXT DEFAULT '',
                customer_code TEXT DEFAULT '',
                customer_name TEXT NOT NULL,
                description TEXT DEFAULT '',
                entry_date TEXT DEFAULT '',
                due_date TEXT DEFAULT '',
                amount REAL DEFAULT 0,
                advance REAL DEFAULT 0,
                payment REAL DEFAULT 0,
                remaining REAL DEFAULT 0,
                balance_payment_date TEXT DEFAULT '',
                address TEXT DEFAULT '',
                status TEXT DEFAULT 'Proceso',
                production_manager TEXT DEFAULT 'Sin asignar',
                created_by TEXT DEFAULT 'Sistema Gerencial',
                updated_by TEXT DEFAULT 'Sistema Gerencial',
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.execute("CREATE INDEX IF NOT EXISTS idx_purchase_orders_number ON purchase_orders(order_number)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_purchase_orders_status ON purchase_orders(status)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_purchase_orders_due_date ON purchase_orders(due_date)")
        conn.execute("""
            CREATE TABLE IF NOT EXISTS quotations (
                id TEXT PRIMARY KEY,
                opportunity_id TEXT NOT NULL,
                quotation_number TEXT NOT NULL UNIQUE,
                quotation_date TEXT NOT NULL,
                valid_days INTEGER NOT NULL DEFAULT 30,
                seller TEXT NOT NULL,
                client TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'Borrador',
                customer_data TEXT NOT NULL DEFAULT '{}',
                payment_terms TEXT DEFAULT '',
                delivery_terms TEXT DEFAULT '',
                warranty_note TEXT DEFAULT '',
                commercial_notes TEXT DEFAULT '',
                special_sizes_note TEXT DEFAULT '',
                subtotal_cents INTEGER NOT NULL DEFAULT 0,
                vat_cents INTEGER NOT NULL DEFAULT 0,
                total_cents INTEGER NOT NULL DEFAULT 0,
                lines TEXT NOT NULL DEFAULT '[]',
                converted_order_id TEXT DEFAULT '',
                converted_at TEXT DEFAULT '',
                created_by TEXT NOT NULL DEFAULT 'Sistema Gerencial',
                updated_by TEXT NOT NULL DEFAULT 'Sistema Gerencial',
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.execute("CREATE INDEX IF NOT EXISTS idx_quotations_opportunity ON quotations(opportunity_id)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_quotations_status ON quotations(status)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_quotations_date ON quotations(quotation_date)")
        conn.execute("""
            CREATE TABLE IF NOT EXISTS control_sales_orders (
                id TEXT PRIMARY KEY,
                external_id TEXT UNIQUE,
                source TEXT NOT NULL DEFAULT 'manual',
                financial_order_id TEXT NOT NULL DEFAULT '',
                source_opportunity_id TEXT NOT NULL DEFAULT '',
                source_quotation_id TEXT NOT NULL DEFAULT '',
                order_number TEXT NOT NULL,
                order_date TEXT NOT NULL,
                seller TEXT NOT NULL,
                client TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'Activa',
                document_type TEXT NOT NULL DEFAULT 'CF',
                total_cents INTEGER NOT NULL DEFAULT 0,
                expected_total_cents INTEGER NOT NULL DEFAULT 0,
                variance_cents INTEGER NOT NULL DEFAULT 0,
                proforma_data TEXT NOT NULL DEFAULT '{}',
                declared_total_cents INTEGER,
                archived INTEGER NOT NULL DEFAULT 0,
                quality_status TEXT DEFAULT '',
                anomalies TEXT NOT NULL DEFAULT '[]',
                source_row_start TEXT DEFAULT '',
                source_row_end TEXT DEFAULT '',
                notes TEXT DEFAULT '',
                commercial_approval_status TEXT NOT NULL DEFAULT 'Pendiente',
                commercial_approved_by TEXT NOT NULL DEFAULT '',
                commercial_approved_at TEXT NOT NULL DEFAULT '',
                commercial_approval_note TEXT NOT NULL DEFAULT '',
                finance_approval_status TEXT NOT NULL DEFAULT 'Pendiente',
                finance_approved_by TEXT NOT NULL DEFAULT '',
                finance_approved_at TEXT NOT NULL DEFAULT '',
                finance_approval_note TEXT NOT NULL DEFAULT '',
                created_by TEXT NOT NULL DEFAULT 'Sistema Gerencial',
                updated_by TEXT NOT NULL DEFAULT 'Sistema Gerencial',
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """)
        control_sales_order_columns = {row["name"] for row in conn.execute("PRAGMA table_info(control_sales_orders)").fetchall()}
        if "document_type" not in control_sales_order_columns:
            conn.execute("ALTER TABLE control_sales_orders ADD COLUMN document_type TEXT NOT NULL DEFAULT 'CF'")
        if "financial_order_id" not in control_sales_order_columns:
            conn.execute("ALTER TABLE control_sales_orders ADD COLUMN financial_order_id TEXT NOT NULL DEFAULT ''")
        if "source_opportunity_id" not in control_sales_order_columns:
            conn.execute("ALTER TABLE control_sales_orders ADD COLUMN source_opportunity_id TEXT NOT NULL DEFAULT ''")
        if "source_quotation_id" not in control_sales_order_columns:
            conn.execute("ALTER TABLE control_sales_orders ADD COLUMN source_quotation_id TEXT NOT NULL DEFAULT ''")
        if "expected_total_cents" not in control_sales_order_columns:
            conn.execute("ALTER TABLE control_sales_orders ADD COLUMN expected_total_cents INTEGER NOT NULL DEFAULT 0")
        if "variance_cents" not in control_sales_order_columns:
            conn.execute("ALTER TABLE control_sales_orders ADD COLUMN variance_cents INTEGER NOT NULL DEFAULT 0")
        if "proforma_data" not in control_sales_order_columns:
            conn.execute("ALTER TABLE control_sales_orders ADD COLUMN proforma_data TEXT NOT NULL DEFAULT '{}'")
        approval_columns = {
            "commercial_approval_status": "TEXT NOT NULL DEFAULT 'Pendiente'",
            "commercial_approved_by": "TEXT NOT NULL DEFAULT ''",
            "commercial_approved_at": "TEXT NOT NULL DEFAULT ''",
            "commercial_approval_note": "TEXT NOT NULL DEFAULT ''",
            "finance_approval_status": "TEXT NOT NULL DEFAULT 'Pendiente'",
            "finance_approved_by": "TEXT NOT NULL DEFAULT ''",
            "finance_approved_at": "TEXT NOT NULL DEFAULT ''",
            "finance_approval_note": "TEXT NOT NULL DEFAULT ''",
        }
        for column, definition in approval_columns.items():
            if column not in control_sales_order_columns:
                conn.execute(f"ALTER TABLE control_sales_orders ADD COLUMN {column} {definition}")
        conn.execute("""
            CREATE UNIQUE INDEX IF NOT EXISTS idx_control_sales_financial_order_id
            ON control_sales_orders(financial_order_id)
            WHERE financial_order_id <> ''
        """)
        conn.execute("""
            CREATE UNIQUE INDEX IF NOT EXISTS idx_control_sales_source_opportunity_id
            ON control_sales_orders(source_opportunity_id)
            WHERE source_opportunity_id <> ''
        """)
        conn.execute("""
            CREATE UNIQUE INDEX IF NOT EXISTS idx_control_sales_source_quotation_id
            ON control_sales_orders(source_quotation_id)
            WHERE source_quotation_id <> ''
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS control_sales_details (
                id TEXT PRIMARY KEY,
                external_id TEXT UNIQUE,
                order_id TEXT NOT NULL REFERENCES control_sales_orders(id),
                group_external_id TEXT DEFAULT '',
                sequence INTEGER NOT NULL,
                product TEXT NOT NULL,
                size TEXT DEFAULT '',
                quantity TEXT NOT NULL,
                unit_price_cents INTEGER,
                vat_cents INTEGER NOT NULL DEFAULT 0,
                line_total_cents INTEGER NOT NULL DEFAULT 0,
                original_total_cents INTEGER,
                notes TEXT DEFAULT '',
                source_row TEXT DEFAULT '',
                quality_status TEXT DEFAULT '',
                review_required INTEGER NOT NULL DEFAULT 0,
                anomalies TEXT NOT NULL DEFAULT '[]',
                active INTEGER NOT NULL DEFAULT 1,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS control_sales_audit (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id TEXT NOT NULL REFERENCES control_sales_orders(id),
                action TEXT NOT NULL,
                user_name TEXT NOT NULL,
                created_at TEXT NOT NULL,
                summary TEXT DEFAULT ''
            )
        """)
        conn.execute("CREATE INDEX IF NOT EXISTS idx_control_sales_number ON control_sales_orders(order_number)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_control_sales_date ON control_sales_orders(order_date)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_control_sales_seller ON control_sales_orders(seller)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_control_sales_details_order ON control_sales_details(order_id, active)")
        conn.execute("""
            INSERT OR IGNORE INTO app_state (key, value)
            VALUES ('opportunities', '[]')
        """)
        repair_missing_result_migrations(conn)
        repair_future_dated_result_migrations(conn)
        conn.execute("""
            INSERT OR IGNORE INTO app_state (key, value)
            VALUES ('strategic_risks', '{}')
        """)
        conn.execute("""
            INSERT OR IGNORE INTO app_state (key, value)
            VALUES ('management_requests', '{}')
        """)
        rows = conn.execute("SELECT * FROM users ORDER BY created_at, username").fetchall()
        if not rows:
            for user in DEFAULT_USERS:
                upsert_user(conn, user)
        migrate_consolidated_permissions(conn)
        grant_johanna_minutes_permissions(conn)
        seed_accounts_receivable(conn)
        seed_purchase_orders(conn)
        recover_purchase_orders_if_empty(conn)
        grant_purchase_order_permissions(conn)
        seed_control_sales(conn)
        grant_control_sales_permissions(conn)
        purge_luis_valladares_test_flow_once(conn)


class AppHandler(BaseHTTPRequestHandler):
    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-System-User-Id")

    def do_OPTIONS(self):
        if self.path.startswith("/api/"):
            self.send_response(204)
            self.send_cors_headers()
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        self.send_error(404)

    def do_GET(self):
        if self.path.startswith("/api/"):
            self.handle_api_get()
            return
        self.serve_static()

    def do_HEAD(self):
        if self.path.startswith("/api/"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_cors_headers()
            self.end_headers()
            return
        self.serve_static(send_body=False)

    def do_POST(self):
        if self.path.startswith("/api/"):
            self.handle_api_post()
            return
        self.send_error(404)

    def do_PUT(self):
        if self.path.startswith("/api/"):
            self.handle_api_put()
            return
        self.send_error(404)

    def handle_api_get(self):
        if self.path == "/api/health":
            self.send_json({"ok": True, "version": API_VERSION})
            return

        if self.path.startswith("/api/crm/"):
            self.handle_crm_api()
            return

        if self.path == "/api/users":
            with connect() as conn:
                rows = conn.execute("""
                    SELECT id, name, username, email, role, password, permissions, permissions_customized, admin
                    FROM users
                    ORDER BY created_at, username
                """).fetchall()
            self.send_json([user_payload(row) for row in rows])
            return

        if self.path == "/api/presence":
            cutoff = time.time() - 90
            with connect() as conn:
                conn.execute("DELETE FROM presence WHERE last_seen < ?", (cutoff,))
                rows = conn.execute("""
                    SELECT user_id, name, role, last_seen
                    FROM presence
                    ORDER BY last_seen DESC, name
                """).fetchall()
            self.send_json([dict(row) for row in rows])
            return

        if self.path == "/api/minutes":
            with connect() as conn:
                rows = conn.execute("""
                    SELECT id, title, area, date, body, created_by, created_at
                    FROM minutes
                    ORDER BY created_at DESC
                """).fetchall()
            self.send_json([
                {
                    "id": row["id"],
                    "title": row["title"],
                    "area": row["area"],
                    "date": row["date"],
                    "body": row["body"],
                    "createdBy": row["created_by"],
                    "createdAt": row["created_at"],
                }
                for row in rows
            ])
            return

        if self.path == "/api/accounts-receivable":
            with connect() as conn:
                rows = conn.execute("""
                    SELECT * FROM accounts_receivable
                    ORDER BY CASE WHEN balance > 0.009 THEN 0 WHEN balance < -0.009 THEN 2 ELSE 1 END,
                             days_outstanding DESC, invoice_date DESC, invoice_number DESC
                """).fetchall()
            self.send_json([receivable_payload(row) for row in rows])
            return

        if self.path == "/api/financial-orders":
            with connect() as conn:
                rows = conn.execute("""
                    SELECT * FROM financial_orders
                    ORDER BY updated_at DESC, created_at DESC, number DESC
                """).fetchall()
            self.send_json([financial_order_payload(row) for row in rows])
            return

        if self.path == "/api/purchase-orders":
            with connect() as conn:
                rows = conn.execute("""
                    SELECT * FROM purchase_orders
                    ORDER BY CASE WHEN lower(status) = 'proceso' THEN 0 ELSE 1 END,
                             due_date DESC, entry_date DESC, order_number DESC
                """).fetchall()
            self.send_json([purchase_order_payload(row) for row in rows])
            return

        if self.path == "/api/quotations":
            with connect() as conn:
                rows = conn.execute("""
                    SELECT * FROM quotations
                    ORDER BY quotation_date DESC, updated_at DESC, quotation_number DESC
                """).fetchall()
            self.send_json([quotation_payload(row) for row in rows])
            return

        if self.path.startswith("/api/quotations/"):
            item_id = unquote(self.path.split("?", 1)[0].rsplit("/", 1)[-1])
            with connect() as conn:
                row = conn.execute("SELECT * FROM quotations WHERE id = ?", (item_id,)).fetchone()
            if not row:
                self.send_json({"error": "Cotizacion no encontrada"}, status=404)
                return
            self.send_json(quotation_payload(row))
            return

        if self.path == "/api/control-sales":
            with connect() as conn:
                rows = conn.execute("""
                    SELECT * FROM control_sales_orders
                    ORDER BY archived, order_date DESC, CAST(order_number AS INTEGER) DESC, order_number DESC
                """).fetchall()
                items = [control_sales_order_payload(conn, row) for row in rows]
                counts = conn.execute("""
                    SELECT COUNT(*) AS orders,
                           (SELECT COUNT(*) FROM control_sales_details WHERE active = 1) AS details
                    FROM control_sales_orders
                """).fetchone()
                imported = conn.execute("SELECT value FROM app_state WHERE key = 'control_sales_import'").fetchone()
            self.send_json({"items": items, "counts": dict(counts), "import": json.loads(imported["value"] if imported else "{}")})
            return

        if self.path.startswith("/api/control-sales/"):
            item_id = unquote(self.path.split("?", 1)[0].rsplit("/", 1)[-1])
            with connect() as conn:
                row = conn.execute("SELECT * FROM control_sales_orders WHERE id = ?", (item_id,)).fetchone()
                item = control_sales_order_payload(conn, row, include_audit=True) if row else None
            if not item:
                self.send_json({"error": "Orden no encontrada"}, status=404)
                return
            self.send_json(item)
            return

        if self.path == "/api/opportunities":
            with connect() as conn:
                repair_missing_result_migrations(conn)
                repair_future_dated_result_migrations(conn)
                repair_converted_result_opportunities(conn)
                items = read_result_opportunities(conn)
            self.send_json(items)
            return

        if self.path == "/api/strategic-risks":
            with connect() as conn:
                row = conn.execute("SELECT value FROM app_state WHERE key = 'strategic_risks'").fetchone()
            self.send_json(json.loads(row["value"] if row else "{}"))
            return

        if self.path == "/api/management-requests":
            with connect() as conn:
                row = conn.execute("SELECT value FROM app_state WHERE key = 'management_requests'").fetchone()
            self.send_json(json.loads(row["value"] if row else "{}"))
            return

        self.send_error(404)

    def handle_api_post(self):
        if self.path.startswith("/api/crm/"):
            self.handle_crm_api()
            return

        path = self.path.split("?", 1)[0]
        opportunity_parts = path.strip("/").split("/")
        if (
            len(opportunity_parts) == 4
            and opportunity_parts[:2] == ["api", "opportunities"]
            and opportunity_parts[3] == "cancel"
        ):
            opportunity_id = unquote(opportunity_parts[2])
            payload = self.read_json()
            with connect() as conn:
                opportunities = read_result_opportunities(conn)
                index = next((i for i, item in enumerate(opportunities) if text(item.get("id")) == opportunity_id), -1)
                if index == -1:
                    self.send_json({"error": "Oportunidad no encontrada"}, status=404)
                    return
                opportunity = opportunities[index]
                if result_opportunity_has_closure(opportunity):
                    self.send_json({"error": "La oportunidad ya tiene un cierre registrado y no se puede anular desde este panel"}, status=409)
                    return
                dependencies = result_opportunity_dependencies(conn, opportunity_id)
                if dependencies:
                    self.send_json({
                        "error": f"No se puede anular porque tiene {' y '.join(dependencies)} vinculados"
                    }, status=409)
                    return
                now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
                actor_id = text(self.headers.get("X-System-User-Id"))
                actor_row = conn.execute(
                    "SELECT id, name, username, email, role, admin FROM users WHERE id = ? LIMIT 1",
                    (actor_id,),
                ).fetchone() if actor_id else None
                actor_user = dict(actor_row) if actor_row else None
                if not is_commercial_management_user(actor_user):
                    self.send_json({"error": "Solo Gerencia de Comercializacion puede anular oportunidades migradas"}, status=403)
                    return
                actor = text(actor_row["name"] if actor_row else payload.get("updatedBy"), "Sistema Gerencial")
                reason = text(payload.get("reason"), "Anulada desde Oportunidades / Gerencia")
                managements = opportunity.get("managements") if isinstance(opportunity.get("managements"), list) else []
                managements.append({
                    "id": f"cancel-{int(time.time() * 1000)}",
                    "date": time.strftime("%Y-%m-%d"),
                    "time": time.strftime("%H:%M"),
                    "stage": "Cierre de ventas",
                    "result": "anulada",
                    "comment": reason,
                    "canceled": False,
                    "createdBy": actor,
                    "createdAt": now,
                })
                opportunity["managements"] = managements
                opportunity["stage"] = "Cierre de ventas"
                opportunity["status"] = "Anulada"
                opportunity["archived"] = True
                opportunity["archiveType"] = "manager_cancellation"
                opportunity["archivedReason"] = reason
                opportunity["archivedAt"] = now
                opportunity["archivedBy"] = actor
                opportunity.setdefault("auditLog", []).append({
                    "id": f"audit-{int(time.time() * 1000)}",
                    "type": "manager_cancellation",
                    "date": now,
                    "reason": reason,
                    "userId": actor_id,
                    "userName": actor,
                })
                write_result_opportunities(conn, opportunities)
            self.send_json({"ok": True, "opportunities": opportunities})
            return

        if self.path == "/api/presence":
            data = self.read_json()
            user_id = text(data.get("userId"))
            name = text(data.get("name"), "Usuario")
            role = text(data.get("role"), "gerencias")
            if not user_id:
                self.send_json({"error": "Usuario requerido"}, status=400)
                return
            now = time.time()
            cutoff = now - 90
            with connect() as conn:
                conn.execute("""
                    INSERT INTO presence (user_id, name, role, last_seen)
                    VALUES (?, ?, ?, ?)
                    ON CONFLICT(user_id) DO UPDATE SET
                        name = excluded.name,
                        role = excluded.role,
                        last_seen = excluded.last_seen
                """, (user_id, name, role, now))
                conn.execute("DELETE FROM presence WHERE last_seen < ?", (cutoff,))
                rows = conn.execute("""
                    SELECT user_id, name, role, last_seen
                    FROM presence
                    ORDER BY last_seen DESC, name
                """).fetchall()
            self.send_json([dict(row) for row in rows])
            return

        if self.path == "/api/minutes":
            data = self.read_json()
            minute_id = text(data.get("id"), f"acta-{int(time.time())}")
            title = text(data.get("title"))
            body = text(data.get("body"))
            if not title or not body:
                self.send_json({"error": "Titulo y contenido requeridos"}, status=400)
                return
            payload = {
                "id": minute_id,
                "title": title,
                "area": text(data.get("area"), "Comite de apoyo"),
                "date": text(data.get("date"), time.strftime("%Y-%m-%d")),
                "body": body,
                "created_by": text(data.get("createdBy"), "Sistema Gerencial"),
                "created_at": text(data.get("createdAt"), time.strftime("%Y-%m-%dT%H:%M:%S")),
            }
            with connect() as conn:
                conn.execute("""
                    INSERT INTO minutes (id, title, area, date, body, created_by, created_at)
                    VALUES (:id, :title, :area, :date, :body, :created_by, :created_at)
                    ON CONFLICT(id) DO UPDATE SET
                        title = excluded.title,
                        area = excluded.area,
                        date = excluded.date,
                        body = excluded.body,
                        created_by = excluded.created_by,
                        created_at = excluded.created_at
                """, payload)
            self.send_json({"ok": True, "minute": data}, status=201)
            return

        if self.path == "/api/accounts-receivable":
            data = self.read_json()
            if not text(data.get("invoiceNumber")) or not text(data.get("customerName")):
                self.send_json({"error": "Factura y cliente son requeridos"}, status=400)
                return
            with connect() as conn:
                item = upsert_receivable(conn, data)
            self.send_json({"ok": True, "item": item}, status=201)
            return

        if self.path == "/api/quotations":
            data = self.read_json()
            try:
                with connect() as conn:
                    item = save_quotation(conn, data)
            except ValueError as error:
                self.send_json({"error": str(error)}, status=400)
                return
            except sqlite3.IntegrityError:
                self.send_json({"error": "No se pudo generar el identificador interno de la cotizacion"}, status=409)
                return
            self.send_json({"ok": True, "item": item}, status=201)
            return

        if self.path == "/api/financial-orders":
            data = self.read_json()
            auto_number = bool(data.pop("autoNumber", False))
            required = ("month", "year", "date", "seller", "client")
            if not all(text(data.get(key)) for key in required):
                self.send_json({"error": "Periodo, fecha, vendedor y cliente son requeridos"}, status=400)
                return
            with connect() as conn:
                if auto_number:
                    conn.execute("BEGIN IMMEDIATE")
                    data["number"] = next_financial_order_number(conn)
                elif not text(data.get("number")):
                    self.send_json({"error": "Numero de pedido requerido"}, status=400)
                    return
                item = upsert_financial_order(conn, data)
            self.send_json({"ok": True, "item": item}, status=201)
            return

        if self.path == "/api/purchase-orders":
            data = self.read_json()
            if not text(data.get("orderNumber")) or not text(data.get("customerName")):
                self.send_json({"error": "Numero de orden y cliente son requeridos"}, status=400)
                return
            with connect() as conn:
                item = upsert_purchase_order(conn, data)
            self.send_json({"ok": True, "item": item}, status=201)
            return

        if self.path == "/api/control-sales":
            data = self.read_json()
            try:
                with connect() as conn:
                    item = save_control_sales_order(conn, data)
            except ValueError as error:
                self.send_json({"error": str(error)}, status=400)
                return
            except sqlite3.IntegrityError:
                self.send_json({"error": "El numero de orden ya existe"}, status=409)
                return
            self.send_json({"ok": True, "item": item}, status=201)
            return

        if self.path == "/api/control-sales/import":
            with connect() as conn:
                seed_control_sales(conn)
                counts = conn.execute("""
                    SELECT COUNT(*) AS orders,
                           (SELECT COUNT(*) FROM control_sales_details WHERE active = 1) AS details
                    FROM control_sales_orders WHERE source = 'importado'
                """).fetchone()
            self.send_json({"ok": True, **dict(counts)})
            return

        if self.path == "/api/users":
            data = self.read_json()
            if isinstance(data.get("users"), list):
                with connect() as conn:
                    saved_passwords = {
                        row["id"]: row["password"]
                        for row in conn.execute("SELECT id, password FROM users").fetchall()
                    }
                    conn.execute("DELETE FROM users")
                    users = []
                    for item in data["users"]:
                        merged = dict(item)
                        merged["password"] = saved_passwords.get(str(item.get("id") or ""), "admin123")
                        users.append(upsert_user(conn, merged))
                self.send_json(users)
                return

            required = ["id", "name", "username", "email", "role", "password"]
            if not all(data.get(key) for key in required):
                self.send_json({"error": "Datos incompletos"}, status=400)
                return
            try:
                with connect() as conn:
                    user = upsert_user(conn, data)
            except sqlite3.IntegrityError:
                self.send_json({"error": "Usuario existente"}, status=409)
                return
            self.send_json({"ok": True, "user": user}, status=201)
            return

        self.send_error(404)

    def handle_api_put(self):
        if self.path.startswith("/api/crm/"):
            self.handle_crm_api()
            return

        if self.path.startswith("/api/accounts-receivable/"):
            item_id = unquote(self.path.rsplit("/", 1)[-1])
            data = self.read_json()
            with connect() as conn:
                row = conn.execute("SELECT * FROM accounts_receivable WHERE id = ?", (item_id,)).fetchone()
                if not row:
                    self.send_json({"error": "Cuenta por cobrar no encontrada"}, status=404)
                    return
                existing = receivable_payload(row)
                data["id"] = item_id
                item = upsert_receivable(conn, data, existing)
            self.send_json({"ok": True, "item": item})
            return

        if self.path.startswith("/api/financial-orders/"):
            item_id = unquote(self.path.rsplit("/", 1)[-1])
            data = self.read_json()
            with connect() as conn:
                row = conn.execute("SELECT * FROM financial_orders WHERE id = ?", (item_id,)).fetchone()
                existing = financial_order_payload(row) if row else None
                data["id"] = item_id
                if existing:
                    data["number"] = existing["number"]
                item = upsert_financial_order(conn, data, existing)
            self.send_json({"ok": True, "item": item})
            return

        if self.path.startswith("/api/purchase-orders/"):
            item_id = unquote(self.path.rsplit("/", 1)[-1])
            data = self.read_json()
            with connect() as conn:
                row = conn.execute("SELECT * FROM purchase_orders WHERE id = ?", (item_id,)).fetchone()
                if not row:
                    self.send_json({"error": "Orden de pedido no encontrada"}, status=404)
                    return
                data["id"] = item_id
                item = upsert_purchase_order(conn, data, purchase_order_payload(row))
            self.send_json({"ok": True, "item": item})
            return

        if self.path.startswith("/api/control-sales/"):
            item_id = unquote(self.path.split("?", 1)[0].rsplit("/", 1)[-1])
            data = self.read_json()
            try:
                with connect() as conn:
                    row = conn.execute("SELECT * FROM control_sales_orders WHERE id = ?", (item_id,)).fetchone()
                    if not row:
                        self.send_json({"error": "Orden no encontrada"}, status=404)
                        return
                    item = save_control_sales_order(conn, data, row)
            except ValueError as error:
                self.send_json({"error": str(error)}, status=400)
                return
            except sqlite3.IntegrityError:
                self.send_json({"error": "El numero de orden ya existe"}, status=409)
                return
            self.send_json({"ok": True, "item": item})
            return

        if self.path.startswith("/api/quotations/"):
            item_id = unquote(self.path.split("?", 1)[0].rsplit("/", 1)[-1])
            data = self.read_json()
            try:
                with connect() as conn:
                    row = conn.execute("SELECT * FROM quotations WHERE id = ?", (item_id,)).fetchone()
                    if not row:
                        self.send_json({"error": "Cotizacion no encontrada"}, status=404)
                        return
                    item = save_quotation(conn, data, row)
            except ValueError as error:
                self.send_json({"error": str(error)}, status=400)
                return
            except sqlite3.IntegrityError:
                self.send_json({"error": "No se pudo generar el identificador interno de la cotizacion"}, status=409)
                return
            self.send_json({"ok": True, "item": item})
            return

        if self.path == "/api/opportunities":
            data = self.read_json()
            if not isinstance(data, list):
                self.send_json({"error": "Se esperaba una lista"}, status=400)
                return
            with connect() as conn:
                conn.execute("""
                    INSERT INTO app_state (key, value, updated_at)
                    VALUES ('opportunities', ?, CURRENT_TIMESTAMP)
                    ON CONFLICT(key) DO UPDATE SET
                        value = excluded.value,
                        updated_at = CURRENT_TIMESTAMP
                """, (json.dumps(data, ensure_ascii=True),))
                repair_missing_result_migrations(conn)
                repair_converted_result_opportunities(conn)
                reconciled = read_result_opportunities(conn)
            self.send_json({"ok": True, "items": reconciled})
            return

        if self.path == "/api/strategic-risks":
            data = self.read_json()
            if not isinstance(data, dict):
                self.send_json({"error": "Se esperaba un objeto por gerencia"}, status=400)
                return
            with connect() as conn:
                conn.execute("""
                    INSERT INTO app_state (key, value, updated_at)
                    VALUES ('strategic_risks', ?, CURRENT_TIMESTAMP)
                    ON CONFLICT(key) DO UPDATE SET
                        value = excluded.value,
                        updated_at = CURRENT_TIMESTAMP
                """, (json.dumps(data, ensure_ascii=True),))
            self.send_json({"ok": True})
            return

        if self.path == "/api/management-requests":
            data = self.read_json()
            if not isinstance(data, dict):
                self.send_json({"error": "Se esperaba un objeto por gerencia"}, status=400)
                return
            with connect() as conn:
                conn.execute("""
                    INSERT INTO app_state (key, value, updated_at)
                    VALUES ('management_requests', ?, CURRENT_TIMESTAMP)
                    ON CONFLICT(key) DO UPDATE SET
                        value = excluded.value,
                        updated_at = CURRENT_TIMESTAMP
                """, (json.dumps(data, ensure_ascii=True),))
            self.send_json({"ok": True})
            return

        self.send_error(404)

    def do_PATCH(self):
        if self.path.startswith("/api/"):
            self.handle_api_patch()
            return
        self.send_error(404)

    def do_DELETE(self):
        if self.path.startswith("/api/"):
            self.handle_api_delete()
            return
        self.send_error(404)

    def handle_api_patch(self):
        if self.path.startswith("/api/crm/"):
            self.handle_crm_api()
            return
        if self.path.startswith("/api/users/") and self.path.split("?", 1)[0].endswith("/password"):
            parts = self.path.split("?", 1)[0].strip("/").split("/")
            user_id = unquote(parts[-2]) if len(parts) >= 4 else ""
            changes = self.read_json()
            current_password = str(changes.get("currentPassword") or "")
            new_password = str(changes.get("newPassword") or "")
            if len(new_password) < 8 or not any(char.isalpha() for char in new_password) or not any(char.isdigit() for char in new_password):
                self.send_json({"error": "Contrasena nueva invalida"}, status=400)
                return
            with connect() as conn:
                valid = conn.execute(
                    "SELECT 1 FROM users WHERE id = ? AND password = ? LIMIT 1",
                    (user_id, current_password),
                ).fetchone()
                if not valid:
                    self.send_json({"error": "Contrasena actual incorrecta"}, status=401)
                    return
                user = patch_user(conn, user_id, {"password": new_password})
            self.send_json({"ok": True, "user": user})
            return
        if self.path.startswith("/api/users/"):
            user_id = unquote(self.path.split("?", 1)[0].rsplit("/", 1)[-1])
            changes = self.read_json()
            with connect() as conn:
                try:
                    user = patch_user(conn, user_id, changes)
                except sqlite3.IntegrityError:
                    self.send_json({"error": "Usuario existente"}, status=409)
                    return
                if not user:
                    self.send_json({"error": "Usuario no encontrado"}, status=404)
                    return
            self.send_json({"ok": True, "user": user})
            return
        control_sales_parts = self.path.split("?", 1)[0].strip("/").split("/")
        if (
            len(control_sales_parts) == 4
            and control_sales_parts[:2] == ["api", "control-sales"]
            and control_sales_parts[3] in {"commercial-approval", "finance-approval"}
        ):
            item_id = unquote(control_sales_parts[2])
            stage = control_sales_parts[3]
            changes = self.read_json()
            status = text(changes.get("status"))
            allowed = {
                "commercial-approval": {"Autorizada", "Devuelta"},
                "finance-approval": {"Aprobada", "Observada"},
            }
            if status not in allowed[stage]:
                self.send_json({"error": "Estado de autorización no válido"}, status=400)
                return
            actor_id = text(self.headers.get("X-System-User-Id"))
            now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            note = text(changes.get("note"))
            with connect() as conn:
                actor_row = conn.execute(
                    "SELECT name, role, admin, permissions FROM users WHERE id = ? LIMIT 1", (actor_id,)
                ).fetchone() if actor_id else None
                required_permission = (
                    "comercializacion:autorizacion-pedidos"
                    if stage == "commercial-approval"
                    else "financiera:resultados-pedidos"
                )
                try:
                    actor_permissions = json.loads(actor_row["permissions"] or "[]") if actor_row else []
                except json.JSONDecodeError:
                    actor_permissions = []
                authorized_role = actor_row and text(actor_row["role"]) in {"gerencias", "jefaturas"}
                authorized_permission = required_permission in actor_permissions
                if not actor_row or (not actor_row["admin"] and not (authorized_role and authorized_permission)):
                    self.send_json({"error": "Tu usuario no tiene permiso para registrar este visto bueno"}, status=403)
                    return
                row = conn.execute("SELECT * FROM control_sales_orders WHERE id = ?", (item_id,)).fetchone()
                if not row:
                    self.send_json({"error": "Orden no encontrada"}, status=404)
                    return
                if row["archived"]:
                    self.send_json({"error": "Una orden archivada no puede autorizarse"}, status=409)
                    return
                actor = text(actor_row["name"], "Sistema Gerencial")
                if stage == "finance-approval" and text(row["commercial_approval_status"]) != "Autorizada":
                    self.send_json({"error": "La orden requiere primero el visto bueno comercial"}, status=409)
                    return
                if stage == "finance-approval" and status == "Aprobada":
                    financial_order_id = text(row["financial_order_id"])
                    financial_row = conn.execute(
                        "SELECT * FROM financial_orders WHERE id = ? AND deleted = 0 LIMIT 1",
                        (financial_order_id,),
                    ).fetchone() if financial_order_id else None
                    required_financial_fields = {
                        "number": "Número", "month": "Mes", "year": "Año", "date": "Fecha de ingreso",
                        "seller": "Vendedor", "order_number": "N.º de orden", "invoice": "Factura",
                        "conditions": "Condiciones", "client": "Cliente", "client_type": "Tipo de cliente",
                        "strategy": "Estrategia", "management": "Gestión", "country": "País",
                        "department": "Departamento",
                    }
                    missing_fields = list(required_financial_fields.values()) if not financial_row else [
                        label for field, label in required_financial_fields.items() if not text(financial_row[field])
                    ]
                    if financial_row and float(financial_row["sale"] or 0) <= 0:
                        missing_fields.append("Venta")
                    if missing_fields:
                        self.send_json({
                            "error": "Completa el registro financiero antes de firmar",
                            "missingFields": missing_fields,
                        }, status=409)
                        return
                if stage == "commercial-approval":
                    conn.execute("""
                        UPDATE control_sales_orders
                        SET commercial_approval_status=?, commercial_approved_by=?, commercial_approved_at=?,
                            commercial_approval_note=?, finance_approval_status='Pendiente', finance_approved_by='',
                            finance_approved_at='', finance_approval_note='', updated_by=?, updated_at=?
                        WHERE id=?
                    """, (status, actor, now, note, actor, now, item_id))
                    action = "autorizacion_comercial" if status == "Autorizada" else "devolucion_comercial"
                else:
                    conn.execute("""
                        UPDATE control_sales_orders
                        SET finance_approval_status=?, finance_approved_by=?, finance_approved_at=?,
                            finance_approval_note=?, updated_by=?, updated_at=? WHERE id=?
                    """, (status, actor, now, note, actor, now, item_id))
                    action = "aprobacion_financiera" if status == "Aprobada" else "observacion_financiera"
                conn.execute(
                    "INSERT INTO control_sales_audit (order_id, action, user_name, created_at, summary) VALUES (?, ?, ?, ?, ?)",
                    (item_id, action, actor, now, note),
                )
                updated = conn.execute("SELECT * FROM control_sales_orders WHERE id = ?", (item_id,)).fetchone()
                item = control_sales_order_payload(conn, updated, include_audit=True)
            self.send_json({"ok": True, "item": item})
            return
        if self.path.startswith("/api/control-sales/"):
            item_id = unquote(self.path.split("?", 1)[0].rsplit("/", 1)[-1])
            changes = self.read_json()
            archived = 1 if changes.get("archived") else 0
            actor = text(changes.get("updatedBy"), "Sistema Gerencial")
            action = "anulacion" if archived else "restauracion"
            now = time.strftime("%Y-%m-%dT%H:%M:%S")
            with connect() as conn:
                result = conn.execute("""
                    UPDATE control_sales_orders SET archived=?, status=?, updated_by=?, updated_at=? WHERE id=?
                """, (archived, "Archivada" if archived else "Activa", actor, now, item_id))
                if not result.rowcount:
                    self.send_json({"error": "Orden no encontrada"}, status=404)
                    return
                conn.execute("INSERT INTO control_sales_audit (order_id, action, user_name, created_at, summary) VALUES (?, ?, ?, ?, ?)",
                             (item_id, action, actor, now, text(changes.get("reason"))))
                row = conn.execute("SELECT * FROM control_sales_orders WHERE id = ?", (item_id,)).fetchone()
                item = control_sales_order_payload(conn, row, include_audit=True)
            self.send_json({"ok": True, "item": item})
            return
        if self.path.startswith("/api/quotations/"):
            item_id = unquote(self.path.split("?", 1)[0].rsplit("/", 1)[-1])
            changes = self.read_json()
            with connect() as conn:
                row = conn.execute("SELECT * FROM quotations WHERE id = ?", (item_id,)).fetchone()
                if not row:
                    self.send_json({"error": "Cotizacion no encontrada"}, status=404)
                    return
                current = quotation_payload(row)
                merged = {**current, **changes}
                merged["customerData"] = {**current.get("customerData", {}), **changes.get("customerData", {})}
                merged["updatedBy"] = text(changes.get("updatedBy"), "Sistema Gerencial")
                try:
                    item = save_quotation(conn, merged, row)
                except ValueError as error:
                    self.send_json({"error": str(error)}, status=400)
                    return
            self.send_json({"ok": True, "item": item})
            return
        self.send_error(404)

    def handle_api_delete(self):
        if self.path.startswith("/api/crm/"):
            self.handle_crm_api()
            return
        if self.path.startswith("/api/accounts-receivable/"):
            item_id = unquote(self.path.rsplit("/", 1)[-1])
            with connect() as conn:
                result = conn.execute("DELETE FROM accounts_receivable WHERE id = ?", (item_id,))
            if not result.rowcount:
                self.send_json({"error": "Cuenta por cobrar no encontrada"}, status=404)
                return
            self.send_json({"ok": True})
            return
        if self.path.startswith("/api/financial-orders/"):
            item_id = unquote(self.path.rsplit("/", 1)[-1])
            data = self.read_json()
            data["id"] = item_id
            data["deleted"] = True
            with connect() as conn:
                row = conn.execute("SELECT * FROM financial_orders WHERE id = ?", (item_id,)).fetchone()
                existing = financial_order_payload(row) if row else None
                item = upsert_financial_order(conn, data, existing)
            self.send_json({"ok": True, "item": item})
            return
        if self.path.startswith("/api/purchase-orders/"):
            item_id = unquote(self.path.rsplit("/", 1)[-1])
            with connect() as conn:
                result = conn.execute("DELETE FROM purchase_orders WHERE id = ?", (item_id,))
            if not result.rowcount:
                self.send_json({"error": "Orden de pedido no encontrada"}, status=404)
                return
            self.send_json({"ok": True})
            return
        if self.path.startswith("/api/quotations/"):
            item_id = unquote(self.path.split("?", 1)[0].rsplit("/", 1)[-1])
            with connect() as conn:
                row = conn.execute("SELECT opportunity_id, converted_order_id FROM quotations WHERE id = ?", (item_id,)).fetchone()
                if not row:
                    self.send_json({"error": "Cotizacion no encontrada"}, status=404)
                    return
                if text(row["converted_order_id"]):
                    self.send_json({"error": "No se puede eliminar una cotizacion convertida a pedido"}, status=409)
                    return
                conn.execute("DELETE FROM quotations WHERE id = ?", (item_id,))
                sync_opportunity_amount_from_latest_quotation(conn, row["opportunity_id"])
            self.send_json({"ok": True})
            return
        if self.path.startswith("/api/minutes/"):
            minute_id = unquote(self.path.rsplit("/", 1)[-1])
            with connect() as conn:
                conn.execute("DELETE FROM minutes WHERE id = ?", (minute_id,))
            self.send_json({"ok": True})
            return
        if self.path.startswith("/api/presence/"):
            user_id = unquote(self.path.rsplit("/", 1)[-1])
            with connect() as conn:
                conn.execute("DELETE FROM presence WHERE user_id = ?", (user_id,))
            self.send_json({"ok": True})
            return
        self.send_error(404)

    def handle_crm_api(self):
        path = self.path.split("?", 1)[0]
        parts = path.strip("/").split("/")
        resource = parts[2] if len(parts) > 2 else ""
        item_id = parts[3] if len(parts) > 3 else ""
        action = parts[4] if len(parts) > 4 else ""

        with connect() as conn:
            data = read_crm_data(conn)
            request_user_id = text(self.headers.get("X-System-User-Id"))
            request_user_row = conn.execute("""
                SELECT id, name, username, email, role, admin
                FROM users
                WHERE id = ?
                LIMIT 1
            """, (request_user_id,)).fetchone() if request_user_id else None
            request_user = dict(request_user_row) if request_user_row else None
            is_restricted_operator = bool(request_user and request_user.get("role") == "operativos" and not request_user.get("admin"))
            request_linked_seller = linked_crm_seller(data, request_user) if is_restricted_operator else None

            if resource == "bootstrap" and self.command == "GET":
                self.send_json(build_crm_view_model(data))
                return

            if resource == "kpis" and self.command == "GET":
                self.send_json(build_crm_view_model(data)["kpis"])
                return

            if resource == "pipeline" and self.command == "GET":
                self.send_json(build_crm_view_model(data)["pipeline"])
                return

            if resource == "agenda" and self.command == "GET":
                self.send_json(build_crm_view_model(data)["agenda"])
                return

            if resource == "auth" and item_id == "login" and self.command == "POST":
                payload = self.read_json()
                username = text(payload.get("username")).lower()
                password = text(payload.get("password"))
                crm_user = next((
                    item for item in data.get("users", [])
                    if username in {text(item.get("username") or item.get("email")).lower(), text(item.get("email")).lower()}
                    and text(item.get("password"), "konfi123") == password
                ), None)
                system_row = conn.execute("""
                    SELECT id, name, username, email, role, permissions
                    FROM users
                    WHERE (lower(username) = ? OR lower(email) = ?) AND password = ?
                    LIMIT 1
                """, (username, username, password)).fetchone()
                system_user = dict(system_row) if system_row else None
                linked_seller = linked_crm_seller(data, system_user) if system_user else None
                system_role = text(system_user.get("role")) if system_user else ""
                if system_user and system_role not in {"operativos", "gerencias", "jefaturas"}:
                    self.send_json({"error": "Perfil sin acceso a la app movil"}, status=403)
                    return
                if system_user and system_role == "operativos" and not linked_seller:
                    self.send_json({"error": "Usuario sin vendedor CRM vinculado"}, status=403)
                    return
                active_user = linked_seller or crm_user
                if not system_user and not active_user:
                    self.send_json({"error": "Credenciales invalidas"}, status=401)
                    return
                model = build_crm_view_model(data)
                if active_user:
                    model["activeUserId"] = active_user.get("id")
                if system_user:
                    model["sessionUser"] = {
                        "id": system_user.get("id"),
                        "name": system_user.get("name"),
                        "username": system_user.get("username"),
                        "email": system_user.get("email"),
                        "role": system_user.get("role"),
                        "crmSellerId": active_user.get("id") if active_user else "",
                    }
                self.send_json(model)
                return

            if resource == "users":
                if self.command == "GET" and not item_id:
                    self.send_json([public_crm_user(user) for user in data.get("users", [])])
                    return
                if self.command == "POST" and not item_id:
                    payload = self.read_json()
                    if not text(payload.get("name")) and not text(payload.get("email")):
                        self.send_json({"error": "Nombre o correo requerido"}, status=400)
                        return
                    if duplicate_crm_user(data, payload):
                        self.send_json({"error": "Usuario CRM existente"}, status=409)
                        return
                    user = {"id": f"u-{int(time.time() * 1000)}", **normalize_crm_user(payload)}
                    data.setdefault("users", []).append(user)
                    write_crm_data(conn, data)
                    model = build_crm_view_model(data)
                    model["activeUserId"] = user["id"]
                    self.send_json(model, status=201)
                    return
                if item_id:
                    index = next((i for i, item in enumerate(data.get("users", [])) if item.get("id") == item_id), -1)
                    if index == -1:
                        self.send_json({"error": "Usuario CRM no encontrado"}, status=404)
                        return
                    if self.command in {"PUT", "PATCH"}:
                        payload = self.read_json()
                        if duplicate_crm_user(data, payload, item_id):
                            self.send_json({"error": "Usuario CRM existente"}, status=409)
                            return
                        data["users"][index] = normalize_crm_user(payload, data["users"][index])
                        write_crm_data(conn, data)
                        model = build_crm_view_model(data)
                        model["activeUserId"] = item_id
                        self.send_json(model)
                        return
                    if action == "purge" and self.command == "POST":
                        if not request_user or (text(request_user.get("role")) != "gerencias" and not request_user.get("admin")):
                            self.send_json({"error": "Solo administracion o gerencia puede ejecutar esta limpieza"}, status=403)
                            return
                        seller = data["users"][index]
                        seller_name = text(seller.get("name"))
                        owned_opportunities = [item for item in data.get("opportunities", []) if text(item.get("ownerId")) == item_id]
                        crm_ids = {text(item.get("id")) for item in owned_opportunities if text(item.get("id"))}
                        result_ids = {text(item.get("resultOpportunityId")) for item in owned_opportunities if text(item.get("resultOpportunityId"))}
                        linked_order = conn.execute(
                            "SELECT 1 FROM control_sales_orders WHERE lower(seller) = lower(?) LIMIT 1",
                            (seller_name,),
                        ).fetchone()
                        converted_quotation = conn.execute(
                            "SELECT 1 FROM quotations WHERE lower(seller) = lower(?) AND converted_order_id <> '' LIMIT 1",
                            (seller_name,),
                        ).fetchone()
                        if crm_ids:
                            placeholders = ",".join("?" for _ in crm_ids)
                            linked_order = linked_order or conn.execute(
                                f"SELECT 1 FROM control_sales_orders WHERE source_opportunity_id IN ({placeholders}) LIMIT 1",
                                tuple(crm_ids),
                            ).fetchone()
                            converted_quotation = converted_quotation or conn.execute(
                                f"SELECT 1 FROM quotations WHERE opportunity_id IN ({placeholders}) AND converted_order_id <> '' LIMIT 1",
                                tuple(crm_ids),
                            ).fetchone()
                        if linked_order or converted_quotation:
                            self.send_json({"error": "No se puede limpiar porque existen pedidos o cotizaciones convertidas"}, status=409)
                            return

                        result_opportunities = read_result_opportunities(conn)
                        result_opportunities = [
                            item for item in result_opportunities
                            if text(item.get("crmOpportunityId")) not in crm_ids
                            and text(item.get("id")) not in result_ids
                            and crm_identity_key(text(item.get("seller"))) != crm_identity_key(seller_name)
                        ]
                        data["opportunities"] = [item for item in data.get("opportunities", []) if text(item.get("ownerId")) != item_id]
                        data["agenda"] = [
                            item for item in data.get("agenda", [])
                            if text(item.get("ownerId")) != item_id and text(item.get("opportunityId")) not in crm_ids
                        ]
                        data["gestiones"] = [
                            item for item in data.get("gestiones", [])
                            if text(item.get("ownerId")) != item_id and text(item.get("opportunityId")) not in crm_ids
                        ]
                        if crm_ids:
                            placeholders = ",".join("?" for _ in crm_ids)
                            conn.execute(f"DELETE FROM quotations WHERE opportunity_id IN ({placeholders})", tuple(crm_ids))
                        conn.execute("DELETE FROM quotations WHERE lower(seller) = lower(?)", (seller_name,))
                        data["users"].pop(index)
                        write_result_opportunities(conn, result_opportunities)
                        write_crm_data(conn, data)
                        response = build_crm_view_model(data)
                        response["purgedSellerId"] = item_id
                        response["purgedOpportunityIds"] = list(crm_ids)
                        self.send_json(response)
                        return
                    if self.command == "DELETE":
                        has_work = any(item.get("ownerId") == item_id for item in data.get("opportunities", [])) or any(item.get("ownerId") == item_id for item in data.get("agenda", []))
                        if has_work:
                            self.send_json({"error": "El vendedor tiene oportunidades o agenda asignada"}, status=409)
                            return
                        data["users"].pop(index)
                        write_crm_data(conn, data)
                        self.send_json(build_crm_view_model(data))
                        return

            if resource == "opportunities":
                if self.command == "GET" and not item_id:
                    self.send_json(build_crm_view_model(data)["opportunities"])
                    return
                if self.command == "POST" and not item_id:
                    payload = self.read_json()
                    if is_restricted_operator:
                        if not request_linked_seller:
                            self.send_json({"error": "Usuario sin vendedor CRM vinculado"}, status=403)
                            return
                        payload["ownerId"] = request_linked_seller.get("id")
                    if not text(payload.get("company")) or not text(payload.get("ownerId")):
                        self.send_json({"error": "Empresa y vendedor requeridos"}, status=400)
                        return
                    opportunity = {"id": f"opp-{int(time.time() * 1000)}", **normalize_crm_opportunity(payload)}
                    data.setdefault("opportunities", []).append(opportunity)
                    upsert_crm_agenda(data, opportunity, payload)
                    write_crm_data(conn, data)
                    self.send_json(build_crm_view_model(data), status=201)
                    return
                if item_id:
                    index = next((i for i, item in enumerate(data.get("opportunities", [])) if item.get("id") == item_id), -1)
                    if index == -1:
                        self.send_json({"error": "Oportunidad no encontrada"}, status=404)
                        return
                    if is_restricted_operator:
                        if not request_linked_seller or data["opportunities"][index].get("ownerId") != request_linked_seller.get("id"):
                            self.send_json({"error": "Solo puede administrar sus propias oportunidades"}, status=403)
                            return
                    if action == "cancel" and self.command == "POST":
                        payload = self.read_json()
                        reason = text(payload.get("reason"))
                        if len(reason) < 5:
                            self.send_json({"error": "Debe indicar una razon de anulacion"}, status=400)
                            return
                        opportunity = data["opportunities"][index]
                        if opportunity.get("migratedToResults"):
                            self.send_json({"error": "La oportunidad ya fue migrada a Gerencia"}, status=409)
                            return
                        now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
                        audit = crm_audit_event("seller_cancellation", opportunity, request_user, reason)
                        opportunity["status"] = "Anulada"
                        opportunity["archived"] = True
                        opportunity["archiveType"] = "seller_cancellation"
                        opportunity["archivedReason"] = reason
                        opportunity["archivedAt"] = now
                        opportunity["archivedBy"] = audit["userName"]
                        opportunity.setdefault("auditLog", []).append(audit)
                        data["agenda"] = [item for item in data.get("agenda", []) if item.get("opportunityId") != item_id]
                        write_crm_data(conn, data)
                        self.send_json(build_crm_view_model(data))
                        return
                    if action == "purge" and self.command == "POST":
                        if not request_user or (text(request_user.get("role")) != "gerencias" and not request_user.get("admin")):
                            self.send_json({"error": "Solo administracion o gerencia puede eliminar definitivamente"}, status=403)
                            return
                        opportunity = data["opportunities"][index]
                        crm_id = text(opportunity.get("id"))
                        result_id = text(opportunity.get("resultOpportunityId"))
                        linked_order = conn.execute(
                            "SELECT 1 FROM control_sales_orders WHERE source_opportunity_id = ? LIMIT 1",
                            (crm_id,),
                        ).fetchone()
                        converted_quotation = conn.execute(
                            "SELECT 1 FROM quotations WHERE opportunity_id = ? AND converted_order_id <> '' LIMIT 1",
                            (crm_id,),
                        ).fetchone()
                        if linked_order or converted_quotation:
                            self.send_json({"error": "No se puede eliminar porque la oportunidad tiene un pedido o una cotizacion convertida"}, status=409)
                            return

                        result_opportunities = read_result_opportunities(conn)
                        result_opportunities = [
                            item for item in result_opportunities
                            if text(item.get("crmOpportunityId")) != crm_id
                            and (not result_id or text(item.get("id")) != result_id)
                        ]
                        data["opportunities"].pop(index)
                        data["agenda"] = [item for item in data.get("agenda", []) if text(item.get("opportunityId")) != crm_id]
                        data["gestiones"] = [item for item in data.get("gestiones", []) if text(item.get("opportunityId")) != crm_id]
                        conn.execute("DELETE FROM quotations WHERE opportunity_id = ?", (crm_id,))
                        write_result_opportunities(conn, result_opportunities)
                        write_crm_data(conn, data)
                        response = build_crm_view_model(data)
                        response["purgedOpportunityId"] = crm_id
                        self.send_json(response)
                        return
                    if action == "return-to-followup" and self.command == "POST":
                        if not is_commercial_management_user(request_user):
                            self.send_json({"error": "Solo Gerencia de Comercializacion puede devolver oportunidades a Seguimiento"}, status=403)
                            return
                        opportunity = data["opportunities"][index]
                        result_opportunities = read_result_opportunities(conn)
                        linked_result_indexes = [
                            i for i, item in enumerate(result_opportunities)
                            if text(item.get("crmOpportunityId")) == item_id
                        ]
                        if not linked_result_indexes or not opportunity.get("migratedToResults"):
                            self.send_json({"error": "La oportunidad no tiene una migracion activa a Gerencia"}, status=409)
                            return
                        linked_results = [result_opportunities[i] for i in linked_result_indexes]
                        result = linked_results[0]
                        dependencies = []
                        for linked_result in linked_results:
                            dependencies.extend(result_opportunity_dependencies(conn, text(linked_result.get("id"))))
                            managements = linked_result.get("managements") if isinstance(linked_result.get("managements"), list) else []
                            active_managements = [item for item in managements if not item.get("canceled") and not item.get("notified")]
                            if result_opportunity_has_closure(linked_result):
                                dependencies.append("un cierre comercial")
                            if len(active_managements) > 1:
                                dependencies.append("gestiones posteriores a la migracion")
                        if dependencies:
                            self.send_json({
                                "error": f"No se puede devolver porque tiene {' y '.join(dict.fromkeys(dependencies))}"
                            }, status=409)
                            return

                        migration_audit = next((
                            audit for audit in reversed(opportunity.get("auditLog", []))
                            if audit.get("type") == "migration"
                        ), {})
                        previous_status = text(migration_audit.get("previousStatus"), "Vigente")
                        now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
                        audit = crm_audit_event(
                            "migration_reversal",
                            opportunity,
                            request_user,
                            "Devuelta a Seguimiento desde Oportunidades / Gerencia",
                            result.get("id"),
                        )
                        opportunity["status"] = previous_status if previous_status.lower() not in {"migrada", "anulada", "cancelada"} else "Vigente"
                        opportunity["archived"] = False
                        for key in [
                            "migratedToResults", "migratedAt", "migratedBy", "resultOpportunityId", "resultOpportunityIds",
                            "archiveType", "archivedReason", "archivedAt", "archivedBy",
                        ]:
                            opportunity.pop(key, None)
                        opportunity.setdefault("auditLog", []).append(audit)
                        data["agenda"] = [item for item in data.get("agenda", []) if item.get("opportunityId") != item_id]
                        data.setdefault("agenda", []).append({
                            "id": f"ag-{int(time.time() * 1000)}",
                            "date": text(opportunity.get("nextDate"), opportunity.get("deadline") or time.strftime("%Y-%m-%d")),
                            "time": "09:00",
                            "type": "Seguimiento",
                            "opportunityId": item_id,
                            "ownerId": opportunity.get("ownerId"),
                            "status": "Programada",
                            "place": text(opportunity.get("location"), "Por definir"),
                            "restoredAt": now,
                        })
                        result_opportunities = [
                            item for item in result_opportunities
                            if text(item.get("crmOpportunityId")) != item_id
                        ]
                        write_result_opportunities(conn, result_opportunities)
                        write_crm_data(conn, data)
                        self.send_json({
                            "crm": build_crm_view_model(data),
                            "opportunities": result_opportunities,
                            "returnedOpportunityId": item_id,
                        })
                        return
                    if action == "migrate" and self.command == "POST":
                        opportunity = data["opportunities"][index]
                        if opportunity.get("archived") and not opportunity.get("migratedToResults"):
                            self.send_json({"error": "No se puede migrar una oportunidad anulada o cerrada"}, status=409)
                            return
                        result_opportunities = read_result_opportunities(conn)
                        linked_results, results_changed = ensure_quotation_result_opportunities(
                            conn, data, opportunity, result_opportunities
                        )
                        result = linked_results[0] if linked_results else None
                        if not result:
                            self.send_json({"error": "No se pudo crear la oportunidad gerencial"}, status=500)
                            return
                        # Persistir siempre la colección completa antes de marcar
                        # el origen como migrado; evita estados parciales.
                        write_result_opportunities(conn, result_opportunities)
                        if not opportunity.get("migratedToResults"):
                            now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
                            audit = crm_audit_event("migration", opportunity, request_user, "Migrada a Oportunidades / Gerencia", result.get("id"))
                            opportunity["migratedToResults"] = True
                            opportunity["migratedAt"] = now
                            opportunity["migratedBy"] = audit["userName"]
                            opportunity["resultOpportunityId"] = result.get("id")
                            opportunity["resultOpportunityIds"] = [item.get("id") for item in linked_results]
                            opportunity["status"] = "Migrada"
                            opportunity["archived"] = True
                            opportunity["archiveType"] = "migration"
                            opportunity["archivedReason"] = "Migrada a Oportunidades / Gerencia"
                            opportunity["archivedAt"] = now
                            opportunity.setdefault("auditLog", []).append(audit)
                            data["agenda"] = [item for item in data.get("agenda", []) if item.get("opportunityId") != item_id]
                            write_crm_data(conn, data)
                        elif linked_results:
                            opportunity["resultOpportunityId"] = linked_results[0].get("id")
                            opportunity["resultOpportunityIds"] = [item.get("id") for item in linked_results]
                            write_crm_data(conn, data)
                        persisted_results = read_result_opportunities(conn)
                        self.send_json({
                            "crm": build_crm_view_model(data),
                            "opportunities": persisted_results,
                            "resultOpportunity": result,
                            "resultOpportunities": linked_results,
                        })
                        return
                    if self.command in {"PUT", "PATCH"}:
                        payload = self.read_json()
                        if request_linked_seller:
                            payload["ownerId"] = request_linked_seller.get("id")
                        opportunity = normalize_crm_opportunity(payload, data["opportunities"][index])
                        data["opportunities"][index] = opportunity
                        upsert_crm_agenda(data, opportunity, payload)
                        write_crm_data(conn, data)
                        self.send_json(build_crm_view_model(data))
                        return
                    if self.command == "DELETE":
                        self.send_json({"error": "Use la anulacion con razon para conservar la bitacora"}, status=409)
                        return

            if resource == "agenda" and item_id and self.command in {"PUT", "PATCH"}:
                index = next((i for i, item in enumerate(data.get("agenda", [])) if item.get("id") == item_id), -1)
                if index == -1:
                    self.send_json({"error": "Agenda no encontrada"}, status=404)
                    return
                payload = self.read_json()
                current = data["agenda"][index]
                next_status = text(payload.get("status"), current.get("status"))
                allowed = {"Programada", "En visita", "Realizada", "Pendiente", "Cancelada", "Reprogramada"}
                current["status"] = next_status if next_status in allowed else current.get("status")
                current["result"] = text(payload.get("result"), current.get("result"))
                if next_status == "En visita":
                    current["checkInAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
                if next_status == "Realizada":
                    current["completedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
                write_crm_data(conn, data)
                self.send_json(build_crm_view_model(data))
                return

            if resource == "gestiones":
                if self.command == "GET" and not item_id:
                    self.send_json(build_crm_view_model(data)["gestiones"])
                    return
                if self.command == "POST":
                    payload = self.read_json()
                    opportunity = next((item for item in data.get("opportunities", []) if item.get("id") == payload.get("opportunityId")), None)
                    if not opportunity:
                        self.send_json({"error": "Oportunidad no encontrada"}, status=404)
                        return
                    gestion = {
                        "id": f"ges-{int(time.time() * 1000)}",
                        "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                        **normalize_crm_gestion({**payload, "company": payload.get("company") or opportunity.get("company"), "ownerId": payload.get("ownerId") or opportunity.get("ownerId")}),
                    }
                    stage_id = whole_number(gestion.get("stageId"), opportunity.get("stageId") or 1)
                    stage = next((item for item in data.get("stages", []) if whole_number(item.get("id")) == stage_id), None)
                    if stage:
                        gestion["stageId"] = stage_id
                        gestion["stageName"] = text(stage.get("name"), f"Etapa {stage_id}")
                        opportunity["stageId"] = stage_id
                    closure_result = text(gestion.get("result")).lower()
                    if closure_result == "ganado":
                        opportunity["status"] = "Ganada"
                    elif closure_result == "perdida":
                        opportunity["status"] = "Perdida"
                        opportunity["archived"] = True
                        opportunity["archivedReason"] = "Cierre perdido"
                        opportunity["archivedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
                    elif text(opportunity.get("status")).lower() in {"ganada", "perdida"}:
                        opportunity["status"] = "Vigente"
                        opportunity["archived"] = False
                        opportunity["archivedReason"] = ""
                        opportunity["archivedAt"] = ""
                    data.setdefault("gestiones", []).append(gestion)
                    if gestion.get("status") == "Programada":
                        data.setdefault("agenda", []).append({
                            "id": f"ag-{gestion['id']}",
                            "gestionId": gestion["id"],
                            "date": gestion.get("date"),
                            "time": gestion.get("time") or "09:00",
                            "type": gestion.get("type") or "Gestion",
                            "opportunityId": opportunity.get("id"),
                            "ownerId": gestion.get("ownerId") or opportunity.get("ownerId"),
                            "status": "Programada",
                            "place": text(payload.get("place"), payload.get("note") or "Por definir"),
                        })
                    write_crm_data(conn, data)
                    self.send_json(build_crm_view_model(data), status=201)
                    return

            self.send_json({"error": "Endpoint CRM no encontrado"}, status=404)

    def serve_static(self, send_body=True):
        path = unquote(self.path.split("?", 1)[0])
        if path == "/":
            path = "/index.html"
        file_path = (ROOT / path.lstrip("/")).resolve()
        if ROOT not in file_path.parents and file_path != ROOT:
            self.send_error(403)
            return
        if not file_path.exists() or not file_path.is_file():
            self.send_error(404)
            return
        content_type = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(file_path.stat().st_size))
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.end_headers()
        if send_body:
            with file_path.open("rb") as handle:
                self.wfile.write(handle.read())

    def read_json(self):
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length).decode("utf-8") if length else "{}"
        return json.loads(raw or "{}")

    def send_json(self, payload, status=200):
        raw = json.dumps(payload, ensure_ascii=True).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(raw)))
        self.send_cors_headers()
        self.end_headers()
        self.wfile.write(raw)

    def log_message(self, fmt, *args):
        print("%s - %s" % (self.address_string(), fmt % args))


if __name__ == "__main__":
    init_db()
    print(f"Sistema Gerencial en http://{HOST}:{PORT}")
    print(f"Base de datos: {DB_PATH}")
    ThreadingHTTPServer((HOST, PORT), AppHandler).serve_forever()
