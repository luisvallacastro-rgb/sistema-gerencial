#!/usr/bin/env python3
import json
import mimetypes
import os
import sqlite3
import time
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parent
DATA_DIR = Path(os.environ.get("DATA_DIR", ROOT))
DATA_DIR.mkdir(parents=True, exist_ok=True)
DB_PATH = DATA_DIR / "sistema-gerencial.db"
CRM_SEED_PATH = ROOT / "crm-seed.json"
ACCOUNTS_RECEIVABLE_SEED_PATH = ROOT / "accounts-receivable-seed.json"
PURCHASE_ORDERS_SEED_PATH = ROOT / "purchase-orders-seed.json"
HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "8097"))
API_VERSION = "kmi-purchase-orders-v1"
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
    "comercializacion": ["resultados", "resultados-oportunidades", "resultados-dashboard", "kpi", "crm", "crm-seguimiento", "crm-agenda", "crm-respuestas", "crm-clientes"],
    "financiera": ["resultados", "resultados-pedidos", "resultados-cuentas-por-cobrar", "resultados-ordenes-de-pedido", "kpi"],
    "operaciones": ["resultados", "kpi"],
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
    for item in result_opportunities:
        crm_opportunity_id = text(item.get("crmOpportunityId"))
        if not crm_opportunity_id:
            continue
        managements = item.get("managements") if isinstance(item.get("managements"), list) else []
        latest_closure = next((
            management for management in reversed(managements)
            if not management.get("canceled")
            and text(management.get("stage")).lower() in {"cierre", "cierre de ventas"}
            and text(management.get("result"))
        ), None)
        if text((latest_closure or {}).get("result")).lower() == "perdida":
            lost_crm_ids.add(crm_opportunity_id)

    changed = False
    for opportunity in data.get("opportunities", []):
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
    email = text(payload.get("email")).lower()
    username = text(payload.get("username") or payload.get("email")).lower()
    dui = text(payload.get("dui"))
    for user in data.get("users", []):
        if user.get("id") == current_id:
            continue
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


def result_opportunity_from_crm(data, opportunity):
    now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    today = time.strftime("%Y-%m-%d")
    result_id = f"result-{text(opportunity.get('id'))}"
    owner = next((item for item in data.get("users", []) if item.get("id") == opportunity.get("ownerId")), {})
    stage = next((item for item in data.get("stages", []) if item.get("id") == opportunity.get("stageId")), {})
    date = text(opportunity.get("nextDate"), opportunity.get("deadline") or opportunity.get("startDate") or today)
    stage_name = text(stage.get("name"), "Prospeccion")
    note = text(opportunity.get("lastNote"), opportunity.get("comment"))
    return {
        "id": result_id,
        "date": date,
        "time": time.strftime("%H:%M"),
        "company": text(opportunity.get("company"), "Cliente CRM"),
        "seller": text(owner.get("name"), "Vendedor CRM"),
        "contact": text(opportunity.get("contact"), opportunity.get("responsible")),
        "phone": text(opportunity.get("phone")),
        "segment": text(opportunity.get("segment"), opportunity.get("product")),
        "location": text(opportunity.get("location")),
        "stage": stage_name,
        "priority": text(opportunity.get("priority"), "Media"),
        "probability": text(opportunity.get("temperature"), "Tibio").lower(),
        "amount": float(opportunity.get("estimatedAmount") or 0),
        "nextAction": text(opportunity.get("nextAction"), "Primer seguimiento"),
        "agendaDate": date,
        "note": note,
        "crmOpportunityId": opportunity.get("id"),
        "migratedAt": now,
        "managements": [{
            "id": f"{result_id}-mgmt-001",
            "date": date,
            "time": time.strftime("%H:%M"),
            "stage": stage_name,
            "comment": f"Migrada desde CRM{': ' + note if note else '.'}",
        }],
    }


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
            for section in ["crm", "crm-seguimiento", "crm-agenda", "crm-respuestas", "crm-clientes"]
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


def upsert_financial_order(conn, data, existing=None):
    item = normalize_financial_order(data, existing)
    conn.execute("""
        INSERT INTO financial_orders (
            id, source_key, source, number, month, year, date, seller, sale,
            order_number, invoice, conditions, client, client_type, strategy,
            management, country, department, deleted, created_by, updated_by,
            created_at, updated_at
        ) VALUES (
            :id, :sourceKey, :source, :number, :month, :year, :date, :seller, :sale,
            :orderNumber, :invoice, :conditions, :client, :clientType, :strategy,
            :management, :country, :department, :deleted, :createdBy, :updatedBy,
            :createdAt, :updatedAt
        )
        ON CONFLICT(id) DO UPDATE SET
            source_key = excluded.source_key,
            source = excluded.source,
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
            INSERT OR IGNORE INTO app_state (key, value)
            VALUES ('opportunities', '[]')
        """)
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
        grant_purchase_order_permissions(conn)


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

        if self.path == "/api/opportunities":
            with connect() as conn:
                value = conn.execute(
                    "SELECT value FROM app_state WHERE key = 'opportunities'"
                ).fetchone()["value"]
            self.send_json(json.loads(value))
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

        if self.path == "/api/financial-orders":
            data = self.read_json()
            required = ("number", "month", "year", "date", "seller", "client")
            if not all(text(data.get(key)) for key in required):
                self.send_json({"error": "Numero, periodo, fecha, vendedor y cliente son requeridos"}, status=400)
                return
            with connect() as conn:
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
            self.send_json({"ok": True})
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
                SELECT id, name, username, email, role
                FROM users
                WHERE id = ?
                LIMIT 1
            """, (request_user_id,)).fetchone() if request_user_id else None
            request_user = dict(request_user_row) if request_user_row else None
            request_linked_seller = linked_crm_seller(data, request_user) if request_user and request_user.get("role") == "operativos" else None

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
                    if request_user and request_user.get("role") == "operativos":
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
                    if request_user and request_user.get("role") == "operativos":
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
                    if action == "migrate" and self.command == "POST":
                        opportunity = data["opportunities"][index]
                        if opportunity.get("archived") and not opportunity.get("migratedToResults"):
                            self.send_json({"error": "No se puede migrar una oportunidad anulada o cerrada"}, status=409)
                            return
                        result_opportunities = read_result_opportunities(conn)
                        result = next((item for item in result_opportunities if item.get("crmOpportunityId") == item_id), None)
                        if not result:
                            result = result_opportunity_from_crm(data, opportunity)
                            result_opportunities.insert(0, result)
                            write_result_opportunities(conn, result_opportunities)
                        if not opportunity.get("migratedToResults"):
                            now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
                            audit = crm_audit_event("migration", opportunity, request_user, "Migrada a Oportunidades / Gerencia", result.get("id"))
                            opportunity["migratedToResults"] = True
                            opportunity["migratedAt"] = now
                            opportunity["migratedBy"] = audit["userName"]
                            opportunity["resultOpportunityId"] = result.get("id")
                            opportunity["status"] = "Migrada"
                            opportunity["archived"] = True
                            opportunity["archiveType"] = "migration"
                            opportunity["archivedReason"] = "Migrada a Oportunidades / Gerencia"
                            opportunity["archivedAt"] = now
                            opportunity.setdefault("auditLog", []).append(audit)
                            data["agenda"] = [item for item in data.get("agenda", []) if item.get("opportunityId") != item_id]
                            write_crm_data(conn, data)
                        self.send_json({
                            "crm": build_crm_view_model(data),
                            "opportunities": result_opportunities,
                            "resultOpportunity": result,
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
