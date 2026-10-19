import json
import unittest
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PRELOAD_PATH = ROOT / "outputs" / "sistema-gerencial" / "labor-benefits-preload.json"


class LaborBenefitsPreloadTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.payload = json.loads(PRELOAD_PATH.read_text(encoding="utf-8"))
        cls.records = cls.payload["records"]

    def test_preload_contains_sixty_unique_employees(self):
        self.assertEqual(len(self.records), 60)
        self.assertEqual(len({item["employeeNumber"] for item in self.records}), 60)
        self.assertEqual(
            [item["employeeNumber"] for item in self.records],
            [f"AC-{number:03d}" for number in range(1, 61)],
        )

    def test_dates_and_money_are_normalized(self):
        for item in self.records:
            date.fromisoformat(item["hireDate"])
            self.assertIn(item["status"], {"Activo", "Inactivo"})
            salary = item["monthlySalaryCents"]
            self.assertTrue(salary is None or isinstance(salary, int))
            self.assertTrue(salary is None or salary > 0)

    def test_reported_days_are_explicitly_informational(self):
        self.assertEqual(self.payload["reportedDaysHeader"], "Días laborados 2025")
        self.assertEqual(self.payload["calculationUse"], "informational-only")
        future_hires = [
            item for item in self.records
            if item["hireDate"] > "2025-12-31" and item["reportedDays"] is not None
        ]
        self.assertTrue(future_hires, "La prueba debe conservar la inconsistencia recibida y bloquear su uso automático")

    def test_unknown_inactive_salaries_remain_missing(self):
        missing_salary = [item for item in self.records if item["monthlySalaryCents"] is None]
        self.assertEqual(
            {item["employeeNumber"] for item in missing_salary},
            {"AC-008", "AC-049", "AC-060"},
        )


if __name__ == "__main__":
    unittest.main()
