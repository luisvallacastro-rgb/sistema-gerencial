import importlib.util
import sqlite3
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("kmi_server_commissions", ROOT / "outputs/sistema-gerencial/server.py")
SERVER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(SERVER)


class CommissionCycleTests(unittest.TestCase):
    def setUp(self):
        self.conn = sqlite3.connect(":memory:")
        self.conn.row_factory = sqlite3.Row
        self.conn.executescript("""
            CREATE TABLE bank_accounts(id TEXT PRIMARY KEY, bank TEXT, account TEXT);
            CREATE TABLE bank_balance_records(id TEXT PRIMARY KEY, record_date TEXT);
            CREATE TABLE bank_deposit_provisions(
                id TEXT PRIMARY KEY, record_id TEXT, account_id TEXT,
                customer_name TEXT, payment_type TEXT, seller TEXT,
                gross_amount REAL, net_amount REAL, commission_rate REAL,
                commission_amount REAL, commission_allocations TEXT, created_at TEXT
            );
            CREATE TABLE commission_settlements(
                id TEXT PRIMARY KEY, number TEXT DEFAULT '', settlement_date TEXT DEFAULT '',
                account_id TEXT DEFAULT '', total_amount REAL DEFAULT 0, reference TEXT DEFAULT '',
                description TEXT DEFAULT '', status TEXT, created_by TEXT DEFAULT '',
                created_at TEXT DEFAULT '', paid_at TEXT DEFAULT '', reviewed_by TEXT DEFAULT '',
                reviewed_at TEXT DEFAULT ''
            );
            CREATE TABLE commission_settlement_items(
                settlement_id TEXT, component_key TEXT, provision_id TEXT,
                seller TEXT DEFAULT '', amount REAL DEFAULT 0, source TEXT DEFAULT '',
                detail TEXT DEFAULT '', snapshot TEXT DEFAULT '{}', created_at TEXT DEFAULT ''
            );
            INSERT INTO bank_accounts VALUES ('account-1', 'BAC', 'Cuenta bancaria');
            INSERT INTO bank_balance_records VALUES ('record-old', '2026-09-01');
            INSERT INTO bank_balance_records VALUES ('record-current', '2026-10-01');
        """)

    def tearDown(self):
        self.conn.close()

    def add_provision(self, provision_id, record_id, seller, gross):
        self.conn.execute("""
            INSERT INTO bank_deposit_provisions VALUES (?, ?, 'account-1', 'Cliente',
                'Cancelación de saldo', ?, ?, 0, 0, 0, '[]', '2026-10-01T10:00:00')
        """, (provision_id, record_id, seller, gross))

    def settle_direct_commission(self, provision_id, seller):
        self.conn.execute("INSERT OR IGNORE INTO commission_settlements(id, status) VALUES ('cut-1', 'Pagada')")
        key = f"seller-direct:{provision_id}:{SERVER.crm_identity_key(seller)}"
        self.conn.execute(
            "INSERT INTO commission_settlement_items(settlement_id, component_key, provision_id) VALUES ('cut-1', ?, ?)",
            (key, provision_id),
        )

    def test_paid_cut_does_not_raise_rate_for_current_pending_cycle(self):
        seller = "Gabriela Amador"
        self.add_provision("old", "record-old", seller, 12000)
        self.add_provision("current", "record-current", seller, 2287.01)
        self.settle_direct_commission("old", seller)

        liability = SERVER.commission_liability_payload(self.conn)
        direct = [item for item in liability["pending"] if item["kind"] == "seller-direct"]

        self.assertEqual(len(direct), 1)
        self.assertEqual(direct[0]["provisionId"], "current")
        self.assertEqual(direct[0]["rate"], 0.02)
        self.assertEqual(direct[0]["amount"], 39.86)

    def test_all_pending_rows_share_the_rate_reached_in_current_cycle(self):
        seller = "Marjorie Morales"
        self.add_provision("pending-1", "record-current", seller, 5000)
        self.add_provision("pending-2", "record-current", seller, 5000)

        liability = SERVER.commission_liability_payload(self.conn)
        direct = [item for item in liability["pending"] if item["kind"] == "seller-direct"]

        self.assertEqual(len(direct), 2)
        self.assertEqual({item["rate"] for item in direct}, {0.03})


if __name__ == "__main__":
    unittest.main()
