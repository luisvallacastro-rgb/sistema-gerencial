#!/usr/bin/env python3
"""Apply only versioned DTE migrations to an explicitly supplied local database."""
import argparse
import importlib.util
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--database", required=True, type=Path)
    args = parser.parse_args()
    database = args.database.expanduser().resolve()
    forbidden = ("/opt/render/", "/var/lib/", "/production/")
    if any(part in str(database).lower() for part in forbidden):
        raise SystemExit("Ruta rechazada: este script es solo para una copia local explícita")
    if not database.is_file():
        raise SystemExit(f"No existe la base local: {database}")
    server_path = ROOT / "outputs/sistema-gerencial/server.py"
    spec = importlib.util.spec_from_file_location("kmi_server", server_path)
    module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
    with sqlite3.connect(database) as conn:
        conn.row_factory = sqlite3.Row
        module.apply_versioned_migrations(conn)
        integrity = conn.execute("PRAGMA integrity_check").fetchone()[0]
        versions = [row[0] for row in conn.execute("SELECT version FROM schema_migrations ORDER BY version")]
    if integrity != "ok": raise SystemExit(f"integrity_check falló: {integrity}")
    print(f"Migraciones locales aplicadas: {', '.join(versions)}; integrity_check=ok")

if __name__ == "__main__": main()
