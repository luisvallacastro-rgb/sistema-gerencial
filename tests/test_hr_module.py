import importlib.util
import sqlite3
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SERVER_PATH = ROOT / "outputs" / "sistema-gerencial" / "server.py"
SPEC = importlib.util.spec_from_file_location("kmi_server_hr_tests", SERVER_PATH)
server = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(server)


class HrModuleTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.db_path = Path(self.temp_dir.name) / "hr.db"
        self.conn = sqlite3.connect(self.db_path)
        self.conn.row_factory = sqlite3.Row
        for migration in ("008_hr_core.sql", "009_hr_absences.sql", "010_hr_personnel_actions.sql"):
            source = (SERVER_PATH.parent / "migrations" / migration).read_text(encoding="utf-8")
            for statement in server.migration_statements(source):
                self.conn.execute(statement)

    def tearDown(self):
        self.conn.close()
        self.temp_dir.cleanup()

    def test_hr_schema_and_unique_employee_number(self):
        tables = {row[0] for row in self.conn.execute("SELECT name FROM sqlite_master WHERE type='table'")}
        self.assertTrue({"hr_employees", "hr_departments", "hr_positions", "hr_audit"}.issubset(tables))
        values = ("hr-1", "0001", "Empleado Uno")
        self.conn.execute("INSERT INTO hr_employees(id, employee_number, full_name) VALUES (?, ?, ?)", values)
        with self.assertRaises(sqlite3.IntegrityError):
            self.conn.execute("INSERT INTO hr_employees(id, employee_number, full_name) VALUES ('hr-2', '0001', 'Otro')")

    def test_salary_is_omitted_without_specific_permission(self):
        self.conn.execute("INSERT INTO hr_employees(id, employee_number, full_name, salary_cents) VALUES ('hr-1', '0001', 'Empleado Uno', 125000)")
        row = self.conn.execute("SELECT * FROM hr_employees WHERE id='hr-1'").fetchone()
        hidden = server.hr_employee_payload(self.conn, row, False)
        visible = server.hr_employee_payload(self.conn, row, True)
        self.assertNotIn("salaryCents", hidden)
        self.assertEqual(visible["salaryCents"], 125000)

    def test_normalization_requires_identity(self):
        _item, errors = server.normalize_hr_employee({"employeeNumber": "", "fullName": ""})
        self.assertEqual(len(errors), 2)

    def test_absence_days_are_calculated_inclusively(self):
        item, errors = server.normalize_hr_absence({
            "employeeId": "hr-1", "type": "Incapacidad ISSS",
            "startDate": "2026-10-08", "endDate": "2026-10-10", "status": "Registrada",
        })
        self.assertEqual(errors, [])
        self.assertEqual(item["days"], 3)

    def test_absence_rejects_reversed_dates(self):
        _item, errors = server.normalize_hr_absence({
            "employeeId": "hr-1", "type": "Permiso",
            "startDate": "2026-10-10", "endDate": "2026-10-08",
        })
        self.assertIn("La fecha final no puede ser anterior a la inicial", errors)

    def test_personnel_action_requires_reason_and_valid_type(self):
        _item, errors = server.normalize_hr_personnel_action({
            "employeeId": "hr-1", "type": "Movimiento desconocido", "effectiveDate": "2026-10-08",
        })
        self.assertIn("El tipo de acción no es válido", errors)
        self.assertIn("El motivo es obligatorio", errors)

    def test_termination_action_updates_employee_without_deleting_history(self):
        self.conn.execute("INSERT INTO hr_employees(id, employee_number, full_name) VALUES ('hr-1','0001','Empleado Uno')")
        self.conn.execute("""INSERT INTO hr_personnel_actions
            (id,employee_id,action_type,effective_date,reason,created_by_id,created_by_name,updated_by_id,updated_by_name)
            VALUES ('action-1','hr-1','Terminación','2026-10-08','Fin de contrato','admin','Admin','admin','Admin')""")
        row = self.conn.execute("SELECT * FROM hr_personnel_actions WHERE id='action-1'").fetchone()
        server.apply_hr_personnel_action(self.conn, row, {"id": "admin", "name": "Admin"})
        self.assertEqual(self.conn.execute("SELECT status FROM hr_employees WHERE id='hr-1'").fetchone()[0], "Inactivo")
        self.assertEqual(self.conn.execute("SELECT status FROM hr_personnel_actions WHERE id='action-1'").fetchone()[0], "Aplicada")


if __name__ == "__main__":
    unittest.main()
