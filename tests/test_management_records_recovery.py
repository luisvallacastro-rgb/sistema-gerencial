import importlib.util
import json
import sqlite3
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "kmi_server_management_recovery",
    ROOT / "outputs/sistema-gerencial/server.py",
)
SERVER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(SERVER)


class ManagementRecordsRecoveryTests(unittest.TestCase):
    def setUp(self):
        self.conn = sqlite3.connect(":memory:")
        self.conn.row_factory = sqlite3.Row
        self.conn.execute("CREATE TABLE app_state(key TEXT PRIMARY KEY, value TEXT, updated_at TEXT)")

    def tearDown(self):
        self.conn.close()

    def records(self, key):
        payload = json.loads(self.conn.execute("SELECT value FROM app_state WHERE key=?", (key,)).fetchone()[0])
        return [item for items in payload.values() for item in items]

    def test_empty_management_stores_are_recovered_from_verified_backup(self):
        self.conn.execute("INSERT INTO app_state(key,value) VALUES('management_requests','{}')")
        self.conn.execute("INSERT INTO app_state(key,value) VALUES('strategic_risks','{}')")
        SERVER.restore_verified_management_records_once(self.conn)
        self.assertEqual(len(self.records("management_requests")), 7)
        self.assertEqual(len(self.records("strategic_risks")), 2)
        self.assertIn("Solicitud de archiveros", {item["subject"] for item in self.records("management_requests")})

    def test_existing_management_records_are_never_overwritten(self):
        current = {"general": [{"id": "new", "subject": "Solicitud nueva"}]}
        self.conn.execute(
            "INSERT INTO app_state(key,value) VALUES('management_requests',?)",
            (json.dumps(current),),
        )
        SERVER.restore_verified_management_records_once(self.conn)
        self.assertEqual(self.records("management_requests"), current["general"])
        SERVER.restore_verified_management_records_once(self.conn)
        self.assertEqual(self.records("management_requests"), current["general"])


if __name__ == "__main__":
    unittest.main()
