#!/usr/bin/env python3
"""Validate or transactionally import an inventory seed into a KMI database.

Dry-run is the default. Applying requires --apply, refuses a non-empty inventory,
and creates a sibling backup before opening the database for writes.
"""

from __future__ import annotations

import argparse
import json
import shutil
import sqlite3
from datetime import datetime
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path


SCHEMA = """
CREATE TABLE IF NOT EXISTS inventory_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL COLLATE NOCASE UNIQUE,
    description TEXT NOT NULL,
    unit TEXT NOT NULL DEFAULT 'Unidad',
    notes TEXT NOT NULL DEFAULT '',
    active INTEGER NOT NULL DEFAULT 1,
    created_by TEXT NOT NULL DEFAULT 'Sistema Gerencial',
    updated_by TEXT NOT NULL DEFAULT 'Sistema Gerencial',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS inventory_movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL REFERENCES inventory_items(id),
    movement_date TEXT NOT NULL,
    movement_type TEXT NOT NULL CHECK (movement_type IN ('ENTRADA', 'SALIDA')),
    quantity_millis INTEGER NOT NULL CHECK (quantity_millis > 0),
    unit_cost_micros INTEGER NOT NULL DEFAULT 0 CHECK (unit_cost_micros >= 0),
    reference TEXT NOT NULL DEFAULT '',
    notes TEXT NOT NULL DEFAULT '',
    created_by TEXT NOT NULL DEFAULT 'Sistema Gerencial',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_item_date
ON inventory_movements(item_id, movement_date, id);
"""


def load_seed(path: Path) -> dict:
    payload = json.loads(path.read_text(encoding="utf-8"))
    if payload.get("schemaVersion") != 1:
        raise ValueError("Version de semilla no compatible")
    codes = [item["code"] for item in payload.get("items", [])]
    if len(codes) != len(set(codes)):
        raise ValueError("La semilla contiene codigos duplicados")
    known = set(codes)
    for movement in payload.get("movements", []):
        if movement["code"] not in known:
            raise ValueError(f"Movimiento sin item: {movement['code']}")
        if movement["type"] not in {"ENTRADA", "SALIDA"}:
            raise ValueError("Tipo de movimiento invalido")
        if int(movement["quantityMillis"]) <= 0:
            raise ValueError("Cantidad de movimiento invalida")
    return payload


def replay(payload: dict) -> dict:
    states = {item["code"]: [0, 0] for item in payload["items"]}
    for movement in payload["movements"]:
        quantity, value = states[movement["code"]]
        moved = int(movement["quantityMillis"])
        average = int((Decimal(value) * 1000 / quantity).quantize(Decimal("1"), rounding=ROUND_HALF_UP)) if quantity else 0
        if movement["type"] == "ENTRADA":
            quantity += moved
            value += int((Decimal(moved) * int(movement["unitCostMicros"]) / 1000).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
        else:
            if moved > quantity:
                raise ValueError(f"Salida {movement['sourceId']} excede existencia de {movement['code']}")
            quantity -= moved
            value -= int((Decimal(moved) * average / 1000).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
            if quantity == 0:
                value = 0
        states[movement["code"]] = [quantity, value]
    return {
        "items": len(payload["items"]),
        "movements": len(payload["movements"]),
        "itemsWithStock": sum(quantity > 0 for quantity, _ in states.values()),
        "quantity": float(sum(Decimal(quantity) / 1000 for quantity, _ in states.values())),
        "value": float(sum(Decimal(value) / 1_000_000 for _, value in states.values())),
    }


def inventory_counts(database: Path) -> tuple[int, int]:
    uri = f"file:{database.resolve()}?mode=ro"
    with sqlite3.connect(uri, uri=True) as connection:
        tables = {row[0] for row in connection.execute("SELECT name FROM sqlite_master WHERE type='table'")}
        if "inventory_items" not in tables:
            return 0, 0
        return (
            connection.execute("SELECT COUNT(*) FROM inventory_items").fetchone()[0],
            connection.execute("SELECT COUNT(*) FROM inventory_movements").fetchone()[0],
        )


def apply_seed(database: Path, payload: dict) -> Path:
    existing_items, existing_movements = inventory_counts(database)
    if existing_items or existing_movements:
        raise RuntimeError(f"Importacion cancelada: inventario existente ({existing_items} items, {existing_movements} movimientos)")
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup = database.with_name(f"{database.name}.before-inventory-{stamp}.bak")
    shutil.copy2(database, backup)
    try:
        with sqlite3.connect(database) as connection:
            connection.execute("PRAGMA foreign_keys=ON")
            connection.execute("BEGIN IMMEDIATE")
            connection.executescript(SCHEMA)
            item_ids = {}
            for item in payload["items"]:
                cursor = connection.execute(
                    """INSERT INTO inventory_items
                    (code, description, unit, notes, active, created_by, updated_by)
                    VALUES (?, ?, ?, ?, ?, 'Importacion Excel', 'Importacion Excel')""",
                    (item["code"], item["description"], item["unit"], item["notes"], int(item.get("active", True))),
                )
                item_ids[item["code"]] = cursor.lastrowid
            connection.executemany(
                """INSERT INTO inventory_movements
                (item_id, movement_date, movement_type, quantity_millis, unit_cost_micros,
                 reference, notes, created_by, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                [(
                    item_ids[movement["code"]], movement["date"], movement["type"],
                    movement["quantityMillis"], movement["unitCostMicros"], movement["reference"],
                    f"Excel #{movement['sourceId']}" + (f" · {movement['notes']}" if movement["notes"] else ""),
                    movement["createdBy"], movement["date"],
                ) for movement in payload["movements"]],
            )
            connection.commit()
    except Exception:
        shutil.copy2(backup, database)
        raise
    return backup


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("seed", type=Path)
    parser.add_argument("database", type=Path)
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    payload = load_seed(args.seed.resolve())
    summary = replay(payload)
    existing = inventory_counts(args.database.resolve())
    print(json.dumps({"mode": "apply" if args.apply else "dry-run", "existing": existing, **summary}, ensure_ascii=False))
    if args.apply:
        backup = apply_seed(args.database.resolve(), payload)
        print(f"Backup: {backup}")


if __name__ == "__main__":
    main()
