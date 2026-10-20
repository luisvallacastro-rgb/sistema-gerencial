from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
APP_JS = (ROOT / "outputs" / "sistema-gerencial" / "app.js").read_text(encoding="utf-8")
STYLES_CSS = (ROOT / "outputs" / "sistema-gerencial" / "styles.css").read_text(encoding="utf-8")


class AdminRequestConsolidationTests(unittest.TestCase):
    def test_admin_requests_include_submitted_customer_requests(self):
        self.assertIn('state.crmData?.customerRequests || []', APP_JS)
        self.assertIn('normalizeKey(item.status || "") !== "borrador"', APP_JS)
        self.assertIn('requestSource: "customer"', APP_JS)
        self.assertIn('subject: `Solicitud de cliente · ${customerName}`', APP_JS)
        self.assertIn('new Set(["atendida", "aprobada", "rechazada"])', APP_JS)

    def test_customer_request_inbox_row_opens_the_existing_crm_request_dialog(self):
        self.assertIn('data-request-source="${item.requestSource || "management"}"', APP_JS)
        self.assertIn('requestButton.dataset.requestSource === "customer"', APP_JS)
        self.assertIn('openCustomerRequestDialog(request, true, false, false)', APP_JS)

    def test_request_rows_cannot_collapse_under_shared_panel_styles(self):
        self.assertIn('.management-request-body.management-request-inbox .request-mail-open', STYLES_CSS)
        self.assertIn('min-height: 72px !important;', STYLES_CSS)
        self.assertIn('visibility: visible !important;', STYLES_CSS)


if __name__ == "__main__":
    unittest.main()
