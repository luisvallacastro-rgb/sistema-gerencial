import importlib.util
import json
import sqlite3
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "kmi_server_opportunity_approval_lifecycle",
    ROOT / "outputs/sistema-gerencial/server.py",
)
SERVER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(SERVER)


def approval_row(commercial="Pendiente", finance="Pendiente", workflow="", archived=0):
    return {
        "recovered_order_archived": archived,
        "recovered_order_proforma_data": json.dumps({"workflow": workflow}),
        "recovered_commercial_status": commercial,
        "recovered_finance_status": finance,
    }


class OpportunityApprovalLifecycleTests(unittest.TestCase):
    def test_return_clears_stale_signature_identity(self):
        self.assertEqual(
            SERVER.approval_signature_identity(
                "Devuelta", "Autorizada", "Odaliz Valencia", "2026-10-19T13:00:00-06:00"
            ),
            ("", ""),
        )

    def test_active_approval_keeps_signature_identity(self):
        self.assertEqual(
            SERVER.approval_signature_identity(
                "Autorizada", "Autorizada", "Odaliz Valencia", "2026-10-19T13:00:00-06:00"
            ),
            ("Odaliz Valencia", "2026-10-19T13:00:00-06:00"),
        )

    def test_standard_order_is_won_only_after_both_approvals(self):
        self.assertFalse(SERVER.control_sales_order_is_finally_approved(
            approval_row(commercial="Autorizada")
        ))
        self.assertTrue(SERVER.control_sales_order_is_finally_approved(
            approval_row(commercial="Autorizada", finance="Aprobada")
        ))

    def test_returned_commercial_approval_is_not_a_win(self):
        self.assertFalse(SERVER.control_sales_order_is_finally_approved(
            approval_row(commercial="Devuelta", finance="Pendiente")
        ))

    def test_direct_order_only_requires_final_finance_approval(self):
        self.assertTrue(SERVER.control_sales_order_is_finally_approved(
            approval_row(finance="Aprobada", workflow="direct-final-only")
        ))

    def test_archived_order_is_never_a_win(self):
        self.assertFalse(SERVER.control_sales_order_is_finally_approved(
            approval_row(commercial="Autorizada", finance="Aprobada", archived=1)
        ))

    def test_migrated_opportunity_reopens_when_automatic_win_is_removed(self):
        connection = sqlite3.connect(":memory:")
        connection.row_factory = sqlite3.Row
        connection.execute("CREATE TABLE app_state(key TEXT PRIMARY KEY, value TEXT, updated_at TEXT)")
        connection.execute(
            "INSERT INTO app_state(key, value) VALUES ('opportunities', '[]')"
        )
        crm = {
            "opportunities": [{
                "id": "opp-imporpec",
                "status": "Ganada",
                "archived": True,
                "migratedToResults": True,
                "wonAt": "2026-10-16",
                "wonManagementId": "recovered-win-quote-imporpec",
            }]
        }

        updated, changed = SERVER.sync_crm_result_closures(connection, crm)

        self.assertTrue(changed)
        opportunity = updated["opportunities"][0]
        self.assertEqual(opportunity["status"], "Migrada")
        self.assertTrue(opportunity["archived"])
        self.assertNotIn("wonAt", opportunity)
        self.assertNotIn("wonManagementId", opportunity)
        connection.close()


if __name__ == "__main__":
    unittest.main()
