#!/usr/bin/env python3
"""Download and verify a read-only production backup onto this Mac."""

import hashlib
import json
import os
import secrets
import sqlite3
import stat
import subprocess
import sys
import tempfile
import urllib.error
import urllib.request
import zipfile
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo


BACKUP_URL = "https://sistema-gerencial.onrender.com/api/system/backup"
BACKUP_DIR = Path.home() / "Documents" / "Codex" / "Respaldos-Sistema-Gerencial"
KEYCHAIN_SERVICE = "sistema-gerencial-backup-token"
KEYCHAIN_ACCOUNT = "sistema-gerencial"
TOKEN_FILE = BACKUP_DIR / ".backup-token"
MAX_ARCHIVE_BYTES = 1024 * 1024 * 1024


def backup_token():
    try:
        result = subprocess.run(
            ["security", "find-generic-password", "-s", KEYCHAIN_SERVICE,
             "-a", KEYCHAIN_ACCOUNT, "-w"],
            check=True, capture_output=True, text=True,
        )
        token = result.stdout.strip()
    except (OSError, subprocess.CalledProcessError):
        if TOKEN_FILE.is_symlink():
            raise RuntimeError("La clave local no puede ser un enlace simbólico")
        if not TOKEN_FILE.is_file():
            raise RuntimeError("Falta la clave local; ejecuta el script con --init-secret")
        if stat.S_IMODE(TOKEN_FILE.stat().st_mode) & 0o077:
            raise RuntimeError("La clave local tiene permisos demasiado amplios")
        token = TOKEN_FILE.read_text(encoding="utf-8").strip()
    if len(token) < 32:
        raise RuntimeError("La clave de respaldo no está configurada correctamente")
    return token


def initialize_secret():
    os.umask(0o077)
    if BACKUP_DIR.is_symlink():
        raise RuntimeError("La carpeta de respaldos no puede ser un enlace simbólico")
    BACKUP_DIR.mkdir(parents=True, exist_ok=True, mode=0o700)
    BACKUP_DIR.chmod(0o700)
    if TOKEN_FILE.exists() or TOKEN_FILE.is_symlink():
        raise RuntimeError("La clave local ya existe; no se reemplazó")
    token = secrets.token_urlsafe(48)
    descriptor = os.open(TOKEN_FILE, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(descriptor, "w", encoding="utf-8") as target:
        target.write(token + "\n")
    print(f"Clave creada en {TOKEN_FILE}. Configúrala como SYSTEM_BACKUP_TOKEN en Render.")


def verify_archive(path):
    with zipfile.ZipFile(path) as archive:
        names = set(archive.namelist())
        if "sistema-gerencial.db" not in names or "manifest.json" not in names:
            raise RuntimeError("El respaldo no contiene la base y el manifiesto")
        if any(name.startswith("/") or ".." in Path(name).parts for name in names):
            raise RuntimeError("El respaldo contiene una ruta no válida")
        if archive.testzip() is not None:
            raise RuntimeError("La verificación del ZIP falló")
        manifest = json.loads(archive.read("manifest.json"))
        with tempfile.TemporaryDirectory(prefix="verificar-respaldo-") as temp_dir:
            db_path = Path(temp_dir) / "sistema-gerencial.db"
            digest = hashlib.sha256()
            with archive.open("sistema-gerencial.db") as source, db_path.open("wb") as target:
                while chunk := source.read(1024 * 1024):
                    digest.update(chunk)
                    target.write(chunk)
            if digest.hexdigest() != manifest.get("databaseSha256"):
                raise RuntimeError("La huella de la base no coincide")
            with sqlite3.connect(f"file:{db_path}?mode=ro", uri=True) as database:
                if database.execute("PRAGMA integrity_check").fetchone()[0] != "ok":
                    raise RuntimeError("La base respaldada no superó integrity_check")
                table_count = database.execute(
                    "SELECT COUNT(*) FROM sqlite_master WHERE type='table'"
                ).fetchone()[0]
            if table_count != manifest.get("tableCount"):
                raise RuntimeError("La cantidad de tablas no coincide")
        return manifest


def main():
    os.umask(0o077)
    token = backup_token()
    if BACKUP_DIR.is_symlink():
        raise RuntimeError("La carpeta de respaldos no puede ser un enlace simbólico")
    BACKUP_DIR.mkdir(parents=True, exist_ok=True, mode=0o700)
    BACKUP_DIR.chmod(0o700)
    timestamp = datetime.now(ZoneInfo("America/El_Salvador")).strftime("%Y-%m-%d_%H-%M-%S")
    final_path = BACKUP_DIR / f"sistema-gerencial_{timestamp}.zip"
    partial_path = BACKUP_DIR / f".sistema-gerencial_{timestamp}.partial"
    if partial_path.exists() or final_path.exists():
        raise RuntimeError("Ya existe un respaldo con esta marca de tiempo")
    request = urllib.request.Request(
        BACKUP_URL,
        headers={"Authorization": f"Bearer {token}", "Accept": "application/zip"},
    )
    try:
        with urllib.request.urlopen(request, timeout=180) as response, partial_path.open("xb") as target:
            if response.status != 200 or response.headers.get_content_type() != "application/zip":
                raise RuntimeError("El servidor no entregó un archivo de respaldo")
            total = 0
            while chunk := response.read(1024 * 1024):
                total += len(chunk)
                if total > MAX_ARCHIVE_BYTES:
                    raise RuntimeError("El respaldo supera el límite de seguridad de 1 GB")
                target.write(chunk)
        manifest = verify_archive(partial_path)
        os.replace(partial_path, final_path)
        print(f"Respaldo verificado: {final_path}")
        print(f"Fecha de origen: {manifest['createdAtUtc']} · Tablas: {manifest['tableCount']}"
              f" · Adjuntos: {len(manifest['attachments'])}")
    finally:
        partial_path.unlink(missing_ok=True)


if __name__ == "__main__":
    try:
        if sys.argv[1:] == ["--init-secret"]:
            initialize_secret()
        elif len(sys.argv) == 1:
            main()
        else:
            raise RuntimeError("Uso: backup_system_daily.py [--init-secret]")
    except urllib.error.HTTPError as error:
        print(f"El servidor rechazó el respaldo (HTTP {error.code})", file=sys.stderr)
        sys.exit(1)
    except (OSError, ValueError, RuntimeError, sqlite3.Error, zipfile.BadZipFile) as error:
        print(f"No se pudo completar el respaldo: {error}", file=sys.stderr)
        sys.exit(1)
