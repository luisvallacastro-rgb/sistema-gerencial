import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
APP_SOURCE = (ROOT / "outputs/sistema-gerencial/app.js").read_text(encoding="utf-8")


class CrmTrackingVisibilityTests(unittest.TestCase):
    def test_linked_closures_do_not_use_company_seller_fallback(self):
        expected = """const closedOpportunityKeys = new Set(allResultClosures
    .filter((item) => !String(item.crmOpportunityId || \"\").trim())"""
        self.assertIn(expected, APP_SOURCE)

    def test_exact_origin_id_still_closes_the_linked_opportunity(self):
        self.assertIn(
            'closedCrmOpportunityIds.has(String(opportunity.id || ""))',
            APP_SOURCE,
        )


if __name__ == "__main__":
    unittest.main()
