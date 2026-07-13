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
HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "8097"))
ADMIN_EMAIL = "luisvallacastro@gmail.com"
AREA_KEYS = ["comercializacion", "financiera", "operaciones", "rrhh"]
AREA_SECTION_KEYS = {
    "comercializacion": ["resultados", "resultados-oportunidades", "resultados-dashboard", "kpi", "crm", "crm-seguimiento", "crm-agenda", "crm-respuestas", "crm-clientes"],
    "financiera": ["resultados", "resultados-pedidos", "kpi"],
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


def read_crm_data(conn):
    row = conn.execute("SELECT value FROM app_state WHERE key = 'crm_data'").fetchone()
    if not row:
        data = load_crm_seed()
        write_crm_data(conn, data)
        return data
    data = json.loads(row["value"])
    data.setdefault("gestiones", [])
    data.setdefault("customers", [])
    data, changed = sync_crm_seed_updates(data)
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
        "ownerId": text(payload.get("ownerId"), existing.get("ownerId") or "u2"),
        "nextAction": text(payload.get("nextAction"), existing.get("nextAction") or "Primer seguimiento"),
        "nextDate": text(payload.get("nextDate"), existing.get("nextDate") or payload.get("deadline")),
        "lastNote": text(payload.get("lastNote"), existing.get("lastNote") or payload.get("comment")),
        "comment": text(payload.get("comment"), existing.get("comment") or payload.get("lastNote")),
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
    total_pipeline = sum(float(item.get("estimatedAmount") or 0) for item in opportunities)
    closed = len([item for item in opportunities if int(item.get("stageId") or 0) >= 6])
    hot = len([item for item in opportunities if item.get("temperature") == "Caliente"])
    pipeline = []
    for stage in stages:
        stage_opportunities = [item for item in opportunities if item.get("stageId") == stage.get("id")]
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
            "totalProspects": len(opportunities),
            "totalPipeline": total_pipeline,
            "totalPipelineLabel": crm_money(total_pipeline),
            "hotOpportunities": hot,
            "scheduledMeetings": len([item for item in agenda if item.get("status") == "Programada"]),
            "inProgressVisits": len([item for item in agenda if item.get("status") == "En visita"]),
            "completedVisits": len([item for item in agenda if item.get("status") == "Realizada"]),
            "closeRate": round((closed / len(opportunities)) * 100) if opportunities else 0,
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


def connect():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


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


class AppHandler(BaseHTTPRequestHandler):
    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

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
            self.send_json({"ok": True})
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

        if self.path == "/api/users":
            data = self.read_json()
            if isinstance(data.get("users"), list):
                with connect() as conn:
                    conn.execute("DELETE FROM users")
                    users = [upsert_user(conn, item) for item in data["users"]]
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
        self.send_error(404)

    def handle_api_delete(self):
        if self.path.startswith("/api/crm/"):
            self.handle_crm_api()
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

        with connect() as conn:
            data = read_crm_data(conn)

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
                user = next((
                    item for item in data.get("users", [])
                    if username in {text(item.get("username") or item.get("email")).lower(), text(item.get("email")).lower()}
                    and text(item.get("password"), "konfi123") == password
                ), None)
                if not user:
                    self.send_json({"error": "Credenciales invalidas"}, status=401)
                    return
                model = build_crm_view_model(data)
                model["activeUserId"] = user.get("id")
                self.send_json(model)
                return

            if resource == "users":
                if self.command == "GET" and not item_id:
                    self.send_json([public_crm_user(user) for user in data.get("users", [])])
                    return
                if self.command == "POST":
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
                if self.command == "POST":
                    payload = self.read_json()
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
                    if self.command in {"PUT", "PATCH"}:
                        payload = self.read_json()
                        opportunity = normalize_crm_opportunity(payload, data["opportunities"][index])
                        data["opportunities"][index] = opportunity
                        upsert_crm_agenda(data, opportunity, payload)
                        write_crm_data(conn, data)
                        self.send_json(build_crm_view_model(data))
                        return
                    if self.command == "DELETE":
                        data["opportunities"].pop(index)
                        data["agenda"] = [item for item in data.get("agenda", []) if item.get("opportunityId") != item_id]
                        write_crm_data(conn, data)
                        self.send_json(build_crm_view_model(data))
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
