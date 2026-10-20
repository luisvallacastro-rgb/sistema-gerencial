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

    def test_existing_management_records_are_preserved_and_verified_records_are_added_once(self):
        current = {"general": [{"id": "new", "subject": "Solicitud nueva"}]}
        self.conn.execute(
            "INSERT INTO app_state(key,value) VALUES('management_requests',?)",
            (json.dumps(current),),
        )
        SERVER.restore_verified_management_records_once(self.conn)
        recovered = self.records("management_requests")
        self.assertIn(current["general"][0], recovered)
        self.assertEqual(len(recovered), 8)
        SERVER.restore_verified_management_records_once(self.conn)
        self.assertEqual(len(self.records("management_requests")), 8)

    def test_verified_records_are_moved_back_to_their_real_area_without_duplication(self):
        misplaced = {
            "comercializacion": [{
                "id": "cd7cdd82-02b0-4e80-a8d1-0dfe92c1f7b5",
                "subject": "Revisión de Aire Acondicionado oficina CREDIC",
                "status": "Enviada",
            }]
        }
        self.conn.execute(
            "INSERT INTO app_state(key,value) VALUES('management_requests',?)",
            (json.dumps(misplaced),),
        )
        SERVER.restore_verified_management_records_once(self.conn)
        payload = json.loads(self.conn.execute(
            "SELECT value FROM app_state WHERE key='management_requests'"
        ).fetchone()[0])
        self.assertNotIn(misplaced["comercializacion"][0], payload["comercializacion"])
        ids = [item["id"] for items in payload.values() for item in items]
        self.assertEqual(ids.count("cd7cdd82-02b0-4e80-a8d1-0dfe92c1f7b5"), 1)
        self.assertIn("cd7cdd82-02b0-4e80-a8d1-0dfe92c1f7b5", {item["id"] for item in payload["rrhh"]})

    def test_empty_store_is_recovered_even_when_a_previous_marker_exists(self):
        self.conn.execute("INSERT INTO app_state(key,value) VALUES('management_requests','{}')")
        self.conn.execute("INSERT INTO app_state(key,value) VALUES('strategic_risks','{}')")
        self.conn.execute(
            "INSERT INTO app_state(key,value) VALUES('recovery.management-records.2026-09-21.v1','{}')"
        )
        SERVER.restore_verified_management_records_once(self.conn)
        self.assertEqual(len(self.records("management_requests")), 7)
        self.assertEqual(len(self.records("strategic_risks")), 2)

    def test_stale_browser_snapshot_cannot_remove_existing_requests(self):
        current = {"rrhh": [{"id": "one", "status": "Enviada"}]}
        incoming = {"rrhh": []}
        merged = SERVER.merge_management_request_stores(current, incoming)
        self.assertEqual(merged, current)

    def test_incoming_request_updates_matching_record_without_dropping_others(self):
        current = {"rrhh": [{"id": "one", "status": "Enviada"}, {"id": "two", "status": "Enviada"}]}
        incoming = {"rrhh": [{"id": "one", "status": "Resuelta", "response": "Listo"}]}
        merged = SERVER.merge_management_request_stores(current, incoming)
        self.assertEqual(len(merged["rrhh"]), 2)
        self.assertEqual(merged["rrhh"][0]["status"], "Resuelta")


if __name__ == "__main__":
    unittest.main()
