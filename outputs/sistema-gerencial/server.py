#!/usr/bin/env python3
import json
import mimetypes
import os
import sqlite3
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parent
DATA_DIR = Path(os.environ.get("DATA_DIR", ROOT))
DATA_DIR.mkdir(parents=True, exist_ok=True)
DB_PATH = DATA_DIR / "sistema-gerencial.db"
HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "8097"))
ADMIN_EMAIL = "luisvallacastro@gmail.com"
AREA_KEYS = ["comercializacion", "financiera", "operaciones", "rrhh"]
SECTION_KEYS = ["resultados", "kpi", "riesgos", "solicitudes"]
SHARED_DEFAULT_SECTION_KEYS = ["riesgos", "solicitudes"]
VALID_ROLES = {"general", "accionistas", *AREA_KEYS}
ALL_PERMISSIONS = [f"{area}:{section}" for area in AREA_KEYS for section in SECTION_KEYS]
SHARED_DEFAULT_PERMISSIONS = [
    f"{area}:{section}" for area in AREA_KEYS for section in SHARED_DEFAULT_SECTION_KEYS
]

DEFAULT_USERS = [
    {
        "id": "user-admin-luis",
        "name": "Luis Valladares",
        "username": "luisvallacastro",
        "email": ADMIN_EMAIL,
        "role": "financiera",
        "password": "admin123",
        "admin": True,
    },
    {"id": "user-general", "name": "Gerencia general", "username": "general", "email": "general@empresa.local", "role": "general", "password": "admin123"},
    {"id": "user-accionistas", "name": "Accionistas", "username": "accionistas", "email": "accionistas@empresa.local", "role": "accionistas", "password": "admin123"},
    {"id": "user-financiera", "name": "Gerencia financiera", "username": "financiera", "email": "financiera@empresa.local", "role": "financiera", "password": "admin123"},
    {"id": "user-comercial", "name": "Gerencia comercializacion", "username": "comercializacion", "email": "comercializacion@empresa.local", "role": "comercializacion", "password": "admin123"},
    {"id": "user-operaciones", "name": "Gerencia operaciones", "username": "operaciones", "email": "operaciones@empresa.local", "role": "operaciones", "password": "admin123"},
    {"id": "user-rrhh", "name": "Gerencia recursos humanos", "username": "rrhh", "email": "rrhh@empresa.local", "role": "rrhh", "password": "admin123"},
]


def default_permissions_for_role(role):
    if role in {"general", "accionistas"}:
        return list(ALL_PERMISSIONS)
    if role in AREA_KEYS:
        return list(dict.fromkeys([f"{role}:{section}" for section in SECTION_KEYS] + SHARED_DEFAULT_PERMISSIONS))
    return list(SHARED_DEFAULT_PERMISSIONS)


def normalize_permissions(value, role):
    if isinstance(value, str):
        try:
            value = json.loads(value)
        except json.JSONDecodeError:
            value = []
    if not isinstance(value, list) or not value:
        value = default_permissions_for_role(role)
    valid = set(ALL_PERMISSIONS)
    return list(dict.fromkeys([item for item in value if item in valid] + SHARED_DEFAULT_PERMISSIONS))


def normalize_user(data, index=0):
    item = dict(data or {})
    email = str(item.get("email") or "").strip().lower()
    username = str(item.get("username") or (email.split("@")[0] if email else f"usuario{index + 1}")).strip().lower()
    role = item.get("role") if item.get("role") in VALID_ROLES else "comercializacion"
    admin = bool(item.get("admin")) or email == ADMIN_EMAIL
    permissions = list(ALL_PERMISSIONS) if admin else normalize_permissions(item.get("permissions"), role)
    return {
        "id": item.get("id") or f"user-{index + 1}",
        "name": item.get("name") or username or "Usuario",
        "username": username,
        "email": email,
        "role": "financiera" if admin else role,
        "password": item.get("password") or "admin123",
        "permissions": permissions,
        "admin": admin,
    }


def user_payload(row):
    data = dict(row)
    data["permissions"] = normalize_permissions(data.get("permissions"), data.get("role"))
    data["admin"] = bool(data.get("admin")) or data.get("email") == ADMIN_EMAIL
    if data["admin"]:
        data["role"] = "financiera"
        data["permissions"] = list(ALL_PERMISSIONS)
    return data


def upsert_user(conn, user):
    normalized = normalize_user(user)
    conn.execute("""
        INSERT INTO users (id, name, username, email, role, password, permissions, admin)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            name = excluded.name,
            username = excluded.username,
            email = excluded.email,
            role = excluded.role,
            password = excluded.password,
            permissions = excluded.permissions,
            admin = excluded.admin
    """, (
        normalized["id"],
        normalized["name"],
        normalized["username"],
        normalized["email"],
        normalized["role"],
        normalized["password"],
        json.dumps(normalized["permissions"], ensure_ascii=True),
        1 if normalized["admin"] else 0,
    ))
    return normalized


def connect():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


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
        conn.execute("""
            CREATE TABLE IF NOT EXISTS app_state (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.execute("""
            INSERT OR IGNORE INTO app_state (key, value)
            VALUES ('opportunities', '[]')
        """)
        rows = conn.execute("SELECT * FROM users ORDER BY created_at, username").fetchall()
        if not rows:
            for user in DEFAULT_USERS:
                upsert_user(conn, user)


class AppHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith("/api/"):
            self.handle_api_get()
            return
        self.serve_static()

    def do_HEAD(self):
        if self.path.startswith("/api/"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
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

        if self.path == "/api/users":
            with connect() as conn:
                rows = conn.execute("""
                    SELECT id, name, username, email, role, password, permissions, admin
                    FROM users
                    ORDER BY created_at, username
                """).fetchall()
            self.send_json([user_payload(row) for row in rows])
            return

        if self.path == "/api/opportunities":
            with connect() as conn:
                value = conn.execute(
                    "SELECT value FROM app_state WHERE key = 'opportunities'"
                ).fetchone()["value"]
            self.send_json(json.loads(value))
            return

        self.send_error(404)

    def handle_api_post(self):
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

        self.send_error(404)

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
        self.end_headers()
        self.wfile.write(raw)

    def log_message(self, fmt, *args):
        print("%s - %s" % (self.address_string(), fmt % args))


if __name__ == "__main__":
    init_db()
    print(f"Sistema Gerencial en http://{HOST}:{PORT}")
    print(f"Base de datos: {DB_PATH}")
    ThreadingHTTPServer((HOST, PORT), AppHandler).serve_forever()
