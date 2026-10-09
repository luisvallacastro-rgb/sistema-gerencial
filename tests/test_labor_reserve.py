import importlib.util
import sqlite3
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "kmi_server_labor_reserve",
    ROOT / "outputs/sistema-gerencial/server.py",
)
SERVER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(SERVER)


class LaborReserveTests(unittest.TestCase):
    def test_uses_latest_azul_laboral_balance_and_calculates_need(self):
        conn = sqlite3.connect(":memory:")
        conn.row_factory = sqlite3.Row
        conn.execute("""CREATE TABLE bank_balance_records(
            id TEXT PRIMARY KEY, account_id TEXT, record_date TEXT,
            sequence INTEGER, balance REAL, created_at TEXT
        )""")
        conn.executemany(
            "INSERT INTO bank_balance_records VALUES (?, 'bank-azul-laboral', ?, ?, ?, ?)",
            [
                ("old", "2026-10-01", 1, 30000, "2026-10-01 08:00:00"),
                ("latest", "2026-10-09", 2, 39217.37, "2026-10-09 08:00:00"),
            ],
        )

        payload = SERVER.labor_reserve_payload(conn)

        self.assertEqual(payload["laborCommitments"], 51359.24)
        self.assertEqual(payload["decemberCommitments"], 19000.00)
        self.assertEqual(payload["totalCommitments"], 70359.24)
        self.assertEqual(payload["laborReserveBalance"], 39217.37)
        self.assertEqual(payload["reserveNeed"], 31141.87)
        self.assertEqual(payload["bankBalanceDate"], "2026-10-09")


if __name__ == "__main__":
    unittest.main()
