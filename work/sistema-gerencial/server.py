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

DEFAULT_USERS = [
    ("user-general", "Gerencia general", "general", "general@empresa.local", "general", "admin123"),
    ("user-accionistas", "Accionistas", "accionistas", "accionistas@empresa.local", "accionistas", "admin123"),
    ("user-financiera", "Gerencia financiera", "financiera", "financiera@empresa.local", "financiera", "admin123"),
    ("user-comercial", "Gerencia comercializacion", "comercializacion", "comercializacion@empresa.local", "comercializacion", "admin123"),
    ("user-operaciones", "Gerencia operaciones", "operaciones", "operaciones@empresa.local", "operaciones", "admin123"),
    ("user-rrhh", "Gerencia recursos humanos", "rrhh", "rrhh@empresa.local", "rrhh", "admin123"),
]


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
        for user in DEFAULT_USERS:
            conn.execute("""
                INSERT OR IGNORE INTO users (id, name, username, email, role, password)
                VALUES (?, ?, ?, ?, ?, ?)
            """, user)


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
                    SELECT id, name, username, email, role, password
                    FROM users
                    ORDER BY created_at, username
                """).fetchall()
            self.send_json([dict(row) for row in rows])
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
            required = ["id", "name", "username", "email", "role", "password"]
            if not all(data.get(key) for key in required):
                self.send_json({"error": "Datos incompletos"}, status=400)
                return
            try:
                with connect() as conn:
                    conn.execute("""
                        INSERT INTO users (id, name, username, email, role, password)
                        VALUES (?, ?, ?, ?, ?, ?)
                    """, (
                        data["id"],
                        data["name"],
                        data["username"],
                        data["email"],
                        data["role"],
                        data["password"],
                    ))
            except sqlite3.IntegrityError:
                self.send_json({"error": "Usuario existente"}, status=409)
                return
            self.send_json({"ok": True, "user": data}, status=201)
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
