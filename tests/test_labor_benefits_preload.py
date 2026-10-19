import json
import importlib.util
import sqlite3
import tempfile
import unittest
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PRELOAD_PATH = ROOT / "outputs" / "sistema-gerencial" / "labor-benefits-preload.json"
SERVER_PATH = ROOT / "outputs" / "sistema-gerencial" / "server.py"
SPEC = importlib.util.spec_from_file_location("kmi_server_labor_benefits_tests", SERVER_PATH)
SERVER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(SERVER)


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

    def test_preload_is_idempotent_in_an_isolated_database(self):
        with tempfile.TemporaryDirectory() as directory:
            connection = sqlite3.connect(Path(directory) / "benefits.db")
            connection.row_factory = sqlite3.Row
            for migration in ("008_hr_core.sql", "013_labor_benefits.sql"):
                source = (SERVER_PATH.parent / "migrations" / migration).read_text(encoding="utf-8")
                for statement in SERVER.migration_statements(source):
                    connection.execute(statement)
            SERVER.seed_labor_benefits_if_empty(connection)
            SERVER.seed_labor_benefits_if_empty(connection)
            self.assertEqual(connection.execute("SELECT COUNT(*) FROM labor_benefit_records").fetchone()[0], 60)
            self.assertEqual(connection.execute("SELECT COUNT(*) FROM hr_employees").fetchone()[0], 60)
            unknown = connection.execute("SELECT monthly_salary_cents FROM labor_benefit_records WHERE employee_number='AC-049'").fetchone()[0]
            self.assertIsNone(unknown)
            connection.close()

    def test_labor_benefits_is_not_a_default_management_permission(self):
        self.assertNotIn(
            SERVER.LABOR_BENEFITS_PERMISSION_KEY,
            SERVER.default_permissions_for_role("gerencias"),
        )


if __name__ == "__main__":
    unittest.main()
