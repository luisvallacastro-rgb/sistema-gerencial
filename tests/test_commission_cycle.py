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
            INSERT INTO bank_balance_records VALUES ('record-next-cut', '2026-10-29');
        """)

    def tearDown(self):
        self.conn.close()

    def add_provision(self, provision_id, record_id, seller, gross, allocations="[]"):
        self.conn.execute("""
            INSERT INTO bank_deposit_provisions VALUES (?, ?, 'account-1', 'Cliente',
                'Cancelación de saldo', ?, ?, 0, 0, 0, ?, '2026-10-01T10:00:00')
        """, (provision_id, record_id, seller, gross, allocations))

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

    def test_cutoff_excludes_later_rows_from_rate_tier(self):
        seller = "Marjorie Morales"
        self.add_provision("current-cut", "record-current", seller, 15000)
        self.add_provision("next-cut", "record-next-cut", seller, 3000)

        full_liability = SERVER.commission_liability_payload(self.conn)
        full_direct = [item for item in full_liability["pending"] if item["kind"] == "seller-direct"]
        cutoff_report = SERVER.bank_seller_income_report_payload(self.conn, "2026-10-28")
        cutoff_liability = SERVER.commission_liability_payload(self.conn, cutoff_report)
        cutoff_direct = [item for item in cutoff_liability["pending"] if item["kind"] == "seller-direct"]

        self.assertEqual({item["rate"] for item in full_direct}, {0.04})
        self.assertEqual([item["provisionId"] for item in cutoff_direct], ["current-cut"])
        self.assertEqual({item["rate"] for item in cutoff_direct}, {0.03})

    def test_percentage_assigned_back_to_marco_is_taxed_as_his_commission(self):
        self.add_provision(
            "marco-self", "record-current", "Marco Velado", 224,
            '[{"seller":"Credy Crece","percent":2},{"seller":"Marco Velado","percent":7}]',
        )

        report = SERVER.bank_seller_income_report_payload(self.conn)
        item = report["items"][0]
        self.assertEqual(item["commissionPending"], 13.66)
        self.assertEqual(item["commissionAllocated"], 3.90)

        liability = SERVER.commission_liability_payload(self.conn, report)
        marco_net = next(item for item in liability["pending"] if item["kind"] == "marco-net")
        marco_tax = next(item for item in liability["pending"] if item["kind"] == "marco-tax")
        credy_tax = next(item for item in liability["pending"] if item["kind"] == "marco-credy-tax")
        credy_net = next(item for item in liability["pending"] if item["kind"] == "marco-allocation")
        self.assertEqual(marco_net["grossCommission"], 13.66)
        self.assertEqual(marco_tax["amount"], 1.37)
        self.assertEqual(marco_net["amount"], 12.30)
        self.assertEqual(credy_tax["amount"], 0.39)
        self.assertEqual(credy_net["grossAllocation"], 3.90)
        self.assertEqual(credy_net["incomeTax"], 0.39)
        self.assertEqual(credy_net["amount"], 3.51)
        self.assertFalse(any(
            item["kind"] == "marco-allocation" and item["seller"] == "Marco Velado"
            for item in liability["pending"]
        ))

    def test_marco_net_is_rounded_once_from_full_precision(self):
        self.add_provision(
            "marco-union", "record-current", "Marco Velado", 1671.04,
            '[{"seller":"Credy Crece","percent":2},{"seller":"Marco Velado","percent":7}]',
        )

        liability = SERVER.commission_liability_payload(self.conn)
        marco_net = next(item for item in liability["pending"] if item["kind"] == "marco-net")
        marco_tax = next(item for item in liability["pending"] if item["kind"] == "marco-tax")

        self.assertEqual(marco_net["grossCommission"], 101.94)
        self.assertEqual(marco_tax["amount"], 10.19)
        self.assertEqual(marco_net["amount"], 91.74)


if __name__ == "__main__":
    unittest.main()
