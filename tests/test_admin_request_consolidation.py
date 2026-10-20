from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
APP_JS = (ROOT / "outputs" / "sistema-gerencial" / "app.js").read_text(encoding="utf-8")
STYLES_CSS = (ROOT / "outputs" / "sistema-gerencial" / "styles.css").read_text(encoding="utf-8")


class AdminRequestConsolidationTests(unittest.TestCase):
    def test_admin_inbox_reads_only_management_requests(self):
        function_start = APP_JS.index("function visibleManagementRequestItems()")
        function_end = APP_JS.index("\n}\n", function_start) + 2
        implementation = APP_JS[function_start:function_end]
        self.assertIn('allSubmenuItems("solicitudes")', implementation)
        self.assertNotIn("customerRequests", implementation)
        self.assertNotIn('requestSource: "customer"', implementation)

    def test_management_rows_keep_their_native_crud_identity(self):
        self.assertIn('data-area="${item.areaKey || state.activeArea}" data-id="${item.id}"', APP_JS)
        self.assertNotIn('data-request-source="${item.requestSource', APP_JS)
        self.assertIn('normalizeKey(item.status) === "atendida"', APP_JS)

    def test_request_rows_cannot_collapse_under_shared_panel_styles(self):
        self.assertIn('.management-request-body.management-request-inbox .request-mail-open', STYLES_CSS)
        self.assertIn('min-height: 72px !important;', STYLES_CSS)
        self.assertIn('visibility: visible !important;', STYLES_CSS)


if __name__ == "__main__":
    unittest.main()
