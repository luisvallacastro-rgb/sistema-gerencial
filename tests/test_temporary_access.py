import importlib.util
import json
import sqlite3
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "kmi_server_temporary_access",
    ROOT / "outputs/sistema-gerencial/server.py",
)
SERVER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(SERVER)


class TemporaryAccessTests(unittest.TestCase):
    def setUp(self):
        self.conn = sqlite3.connect(":memory:")
        self.conn.row_factory = sqlite3.Row
        self.conn.execute("CREATE TABLE app_state(key TEXT PRIMARY KEY, value TEXT, updated_at TEXT)")

    def tearDown(self):
        self.conn.close()

    def save(self, enabled):
        self.conn.execute(
            "INSERT OR REPLACE INTO app_state(key, value) VALUES (?, ?)",
            (SERVER.TEMPORARY_SIGNED_ORDER_EDIT_KEY, json.dumps({"enabled": enabled})),
        )

    def test_access_is_disabled_when_no_state_has_been_saved(self):
        self.assertFalse(SERVER.temporary_signed_order_edit_enabled(self.conn))

    def test_disabled_state_survives_a_new_read(self):
        self.save(False)
        self.assertFalse(SERVER.temporary_signed_order_edit_enabled(self.conn))

    def test_enabled_state_is_read_explicitly(self):
        self.save(True)
        self.assertTrue(SERVER.temporary_signed_order_edit_enabled(self.conn))

    def test_assigned_permission_can_manage_temporary_access(self):
        user = {
            "admin": 0,
            "role": "gerencias",
            "permissions": json.dumps([SERVER.TEMPORARY_ACCESS_PERMISSION_KEY]),
        }
        self.assertTrue(SERVER.can_manage_temporary_access(user))

    def test_user_without_permission_cannot_manage_temporary_access(self):
        user = {"admin": 0, "role": "operativos", "permissions": "[]"}
        self.assertFalse(SERVER.can_manage_temporary_access(user))


if __name__ == "__main__":
    unittest.main()
