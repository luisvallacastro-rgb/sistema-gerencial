import importlib.util
import json
import sqlite3
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("kmi_server", ROOT / "outputs/sistema-gerencial/server.py")
SERVER = importlib.util.module_from_spec(SPEC); SPEC.loader.exec_module(SERVER)


class DteModuleTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.conn = sqlite3.connect(Path(self.temp.name) / "test.db")
        self.conn.row_factory = sqlite3.Row
        self.conn.executescript("""
          CREATE TABLE users(id TEXT PRIMARY KEY,name TEXT,username TEXT,email TEXT,phone TEXT,role TEXT,password TEXT,permissions TEXT,permissions_customized INTEGER,admin INTEGER);
          CREATE TABLE control_sales_orders(
            id TEXT PRIMARY KEY,external_id TEXT DEFAULT '',source TEXT DEFAULT '',financial_order_id TEXT DEFAULT '',source_opportunity_id TEXT DEFAULT '',source_quotation_id TEXT DEFAULT '',
            expected_total_cents INTEGER DEFAULT 0,variance_cents INTEGER DEFAULT 0,order_number TEXT,order_date TEXT,seller TEXT,client TEXT,status TEXT,document_type TEXT,total_cents INTEGER,
            proforma_data TEXT DEFAULT '{}',declared_total_cents INTEGER DEFAULT 0,archived INTEGER DEFAULT 0,quality_status TEXT DEFAULT '',anomalies TEXT DEFAULT '[]',source_row_start INTEGER DEFAULT 0,source_row_end INTEGER DEFAULT 0,
            notes TEXT DEFAULT '',created_by TEXT DEFAULT '',updated_by TEXT DEFAULT '',created_at TEXT DEFAULT '',updated_at TEXT DEFAULT '',commercial_approval_status TEXT DEFAULT 'Autorizada',commercial_approved_by TEXT DEFAULT '',commercial_approved_at TEXT DEFAULT '',commercial_approval_note TEXT DEFAULT '',finance_approval_status TEXT DEFAULT 'Autorizada',finance_approved_by TEXT DEFAULT '',finance_approved_at TEXT DEFAULT '',finance_approval_note TEXT DEFAULT '');
          CREATE TABLE control_sales_details(
            id TEXT PRIMARY KEY,order_id TEXT,external_id TEXT DEFAULT '',group_external_id TEXT DEFAULT '',sequence INTEGER,product TEXT,size TEXT DEFAULT '',quantity REAL,unit_price_cents INTEGER,vat_cents INTEGER,line_total_cents INTEGER,original_total_cents INTEGER,notes TEXT DEFAULT '',source_row INTEGER DEFAULT 0,quality_status TEXT DEFAULT '',review_required INTEGER DEFAULT 0,anomalies TEXT DEFAULT '[]',active INTEGER DEFAULT 1,created_at TEXT DEFAULT '');
          CREATE TABLE control_sales_audit(id INTEGER PRIMARY KEY,order_id TEXT,action TEXT,user_name TEXT,created_at TEXT,summary TEXT);
        """)
        self.conn.execute("INSERT INTO users VALUES ('u1','Luis','luis','luis@example.test','','gerencias','secret','[]',0,1)")
        SERVER.apply_versioned_migrations(self.conn)
        self.conn.execute("UPDATE billing_settings SET establishment_snapshot_json = ? WHERE id = 1", (json.dumps({
          "controlEstablishmentCode":"M001","controlPointOfSaleCode":"P001",
          "codEstable":"M001","codPuntoVenta":"P001"
        }),))

    def tearDown(self):
        self.conn.close(); self.temp.cleanup()

    def insert_order(self, document_type="Consumidor final", total=11300, vat=0):
        self.conn.execute("""INSERT INTO control_sales_orders
          (id,order_number,order_date,seller,client,status,document_type,total_cents,proforma_data,declared_total_cents,created_at,updated_at)
          VALUES ('o1','2026100001','2026-10-05','Odaliz','Cliente Prueba','Confirmada',?,?,?,?,'2026-10-05','2026-10-05')""",
          (document_type,total,json.dumps({"nit":"0614-000000-000-0","nrc":"12345-6",
           "taxId":"0614-000000-000-0","registrationNumber":"12345-6",
           "legalName":"Cliente Prueba, S.A. de C.V.","commercialName":"Cliente Prueba",
           "economicActivityCode":"14109","businessActivity":"Fabricación de prendas",
           "departmentCode":"06","municipalityCode":"23","address":"San Salvador",
           "phone":"2222-2222","email":"cliente@example.test"}),total))
        self.conn.execute("""INSERT INTO control_sales_details
          (id,order_id,sequence,product,quantity,unit_price_cents,vat_cents,line_total_cents,original_total_cents)
          VALUES ('l1','o1',1,'Producto',1,?,?,?,?)""", (total,vat,total,total))
        self.conn.execute("""INSERT INTO billing_source_reviews
          (source_type,source_id,source_number,status,reviewed_by_id,reviewed_by_name,reviewed_at)
          VALUES ('ORDER','o1','2026100001','CONFIRMED_UNBILLED','u1','Luis','2026-10-05T12:00:00Z')""")

    def test_migration_is_idempotent_and_integrity_is_ok(self):
        SERVER.apply_versioned_migrations(self.conn)
        self.assertEqual(self.conn.execute("SELECT COUNT(*) FROM schema_migrations").fetchone()[0], 12)
        self.assertEqual(self.conn.execute("PRAGMA integrity_check").fetchone()[0], "ok")
        profile = self.conn.execute("""SELECT schema_version, official_schema_embedded
          FROM billing_validation_profiles WHERE document_type='03'""").fetchone()
        self.assertEqual((profile["schema_version"], profile["official_schema_embedded"]), (4, 0))

    def test_fiscal_module_is_private_by_default_and_grantable_from_access_maintenance(self):
        module = "financiera:facturacion-electronica"
        self.assertNotIn(module, SERVER.default_permissions_for_role("gerencias"))
        self.assertNotIn(module, SERVER.default_permissions_for_role("jefaturas"))
        granted = SERVER.normalize_permissions([module], "gerencias")
        self.assertIn(module, granted)
        self.assertIn("financiera:facturacion-electronica-consultar", granted)
        self.assertIn("financiera:facturacion-electronica-preparar", granted)

    def test_only_luis_admin_inherits_fiscal_access(self):
        module = "financiera:facturacion-electronica"
        luis = SERVER.normalize_user({
            "id": "luis", "name": "Luis Valladares", "username": "luisvallacastro",
            "email": SERVER.ADMIN_EMAIL, "role": "gerencias", "admin": True,
        })
        tester = SERVER.normalize_user({
            "id": "tester", "name": "Probador local", "username": "tester",
            "email": "tester@example.invalid", "role": "gerencias", "admin": True,
        })
        self.assertIn(module, luis["permissions"])
        self.assertNotIn(module, tester["permissions"])

    def test_initial_owner_lock_removes_other_fiscal_access_only_once(self):
        module = "financiera:facturacion-electronica"
        self.conn.execute("CREATE TABLE app_state(key TEXT PRIMARY KEY,value TEXT,updated_at TEXT)")
        self.conn.execute(
            "UPDATE users SET name='Luis Valladares', username='luisvallacastro', email=? WHERE id='u1'",
            (SERVER.ADMIN_EMAIL,),
        )
        self.conn.execute(
            "INSERT INTO users VALUES ('u2','Amadeo Alfaro','amadeo','amadeo@example.test','','gerencias','secret',?,1,0)",
            (json.dumps([module, "financiera:facturacion-electronica-consultar"]),),
        )
        self.assertTrue(SERVER.enforce_initial_fiscal_owner_access_once(self.conn))
        luis_permissions = json.loads(self.conn.execute("SELECT permissions FROM users WHERE id='u1'").fetchone()[0])
        other_permissions = json.loads(self.conn.execute("SELECT permissions FROM users WHERE id='u2'").fetchone()[0])
        self.assertIn(module, luis_permissions)
        self.assertFalse(set(other_permissions) & set(SERVER.FISCAL_ACCESS_PERMISSION_KEYS))
        self.conn.execute("UPDATE users SET permissions=? WHERE id='u2'", (json.dumps([module]),))
        self.assertFalse(SERVER.enforce_initial_fiscal_owner_access_once(self.conn))
        self.assertEqual(json.loads(self.conn.execute("SELECT permissions FROM users WHERE id='u2'").fetchone()[0]), [module])

    def test_billing_tables_have_no_operational_foreign_keys(self):
        tables = [row[0] for row in self.conn.execute("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'billing_%'")]
        forbidden = {"control_sales_orders", "control_sales_details", "production_orders", "dispatches", "deliveries", "clients", "users"}
        for table in tables:
            targets = {row[2] for row in self.conn.execute(f"PRAGMA foreign_key_list('{table}')")}
            self.assertFalse(targets & forbidden, f"{table} depende de {targets & forbidden}")

    def test_consumer_final_zero_source_vat_is_not_treated_as_exempt(self):
        values = SERVER.fiscal_line_values({"lineTotalCents": 11300, "vatCents": 0, "quantity": 1}, "01")
        self.assertEqual(values["taxable"], 11300)
        self.assertEqual(values["vat"], 1300)
        self.assertEqual(values["total"], values["taxable"])

    def test_draft_snapshot_and_double_click_are_idempotent(self):
        self.insert_order()
        actor = {"id":"u1","name":"Luis"}
        first, created = SERVER.create_fiscal_draft(self.conn,"o1","01","same-click",actor)
        second, created_again = SERVER.create_fiscal_draft(self.conn,"o1","01","same-click",actor)
        self.assertTrue(created); self.assertFalse(created_again)
        self.assertEqual(first["id"], second["id"])
        self.assertEqual(first["status"], "DRAFT")
        self.assertEqual(first["issuerSnapshot"]["nombre"], "KONFI INVERSIONES S.A. DE C.V.")
        self.assertRegex(first["generationCode"], r"^[0-9A-F-]{36}$")
        self.assertEqual(first["controlNumber"], "DTE-01-M001P001-000000000000001")
        self.assertEqual(first["unsignedPayload"]["emisor"]["nombre"], "KONFI INVERSIONES S.A. DE C.V.")
        self.assertEqual(first["unsignedPayload"]["receptor"]["nombre"], "Cliente Prueba, S.A. de C.V.")
        self.assertEqual(first["subtotalCents"], 11300)
        self.assertEqual(first["vatCents"], 1300)
        payload = first["unsignedPayload"]
        self.assertEqual(payload["cuerpoDocumento"][0]["ventaGravada"], 113.0)
        self.assertEqual(payload["cuerpoDocumento"][0]["ivaItem"], 13.0)
        self.assertNotIn("tributos", payload["cuerpoDocumento"][0])
        self.assertEqual(payload["resumen"]["totalIva"], 13.0)
        self.assertEqual(payload["resumen"]["montoTotalOperacion"], 113.0)
        self.assertEqual(self.conn.execute("SELECT COUNT(*) FROM billing_documents").fetchone()[0], 1)

    def test_second_active_document_is_blocked(self):
        self.insert_order(); actor={"id":"u1","name":"Luis"}
        SERVER.create_fiscal_draft(self.conn,"o1","01","first",actor)
        with self.assertRaisesRegex(ValueError,"ya tiene"):
            SERVER.create_fiscal_draft(self.conn,"o1","01","second",actor)

    def test_missing_establishment_is_blocked_without_creating_duplicate(self):
        self.insert_order(); actor={"id":"u1","name":"Luis"}
        self.conn.execute("UPDATE billing_settings SET establishment_snapshot_json='{}' WHERE id=1")
        with self.assertRaisesRegex(ValueError,"Configuración fiscal"):
            SERVER.create_fiscal_draft(self.conn,"o1","01","missing-config",actor)
        self.assertEqual(self.conn.execute("SELECT COUNT(*) FROM billing_documents").fetchone()[0], 0)

    def test_credit_fiscal_uses_version_four_and_receiver_tax_data(self):
        self.insert_order(document_type="Crédito fiscal", total=11300, vat=1300)
        draft, created = SERVER.create_fiscal_draft(self.conn,"o1","03","ccf",{"id":"u1","name":"Luis"})
        self.assertTrue(created)
        self.assertEqual(draft["status"], "DRAFT")
        payload = draft["unsignedPayload"]
        self.assertEqual(payload["identificacion"]["version"], 4)
        self.assertEqual(payload["identificacion"]["tipoDte"], "03")
        self.assertEqual(payload["receptor"]["nit"], "06140000000000")
        self.assertEqual(payload["receptor"]["nrc"], "123456")
        self.assertEqual(payload["cuerpoDocumento"][0]["precioUni"], 100.0)
        self.assertEqual(payload["cuerpoDocumento"][0]["ventaGravada"], 100.0)
        self.assertEqual(payload["resumen"]["tributos"][0]["codigo"], "20")
        self.assertEqual(payload["resumen"]["montoTotalOperacion"], 113.0)

    def test_credit_fiscal_keeps_type_and_accepts_explicit_missing_activity_for_test_snapshot(self):
        self.insert_order(document_type="Crédito fiscal", total=11300, vat=1300)
        source = json.loads(self.conn.execute("SELECT proforma_data FROM control_sales_orders WHERE id='o1'").fetchone()[0])
        source.pop("economicActivityCode", None)
        self.conn.execute("UPDATE control_sales_orders SET proforma_data=? WHERE id='o1'", (json.dumps(source),))
        draft, created = SERVER.create_fiscal_draft(
            self.conn, "o1", "03", "ccf-with-explicit-activity", {"id":"u1","name":"Luis"},
            receiver_override={"economicActivityCode":"85211"}
        )
        self.assertTrue(created)
        self.assertEqual(draft["documentType"], "03")
        self.assertEqual(draft["customerSnapshot"]["codActividad"], "85211")
        self.assertTrue(draft["validation"]["valid"])

    def test_credit_fiscal_accepts_commercial_tax_aliases_and_exact_catalog_match(self):
        self.insert_order(document_type="Crédito fiscal", total=11300, vat=1300)
        source = {
          "taxId":"0614-141113-110-0", "registrationNumber":"230482-0",
          "legalName":"SEGUROS FEDECREDITO, SOCIEDAD ANONIMA.",
          "commercialName":"SEGUROS FEDECREDITO",
          "businessActivity":"SEGUROS GENERALES DE TODO TIPO",
          "department":"San Salvador", "municipality":"San Salvador Centro",
          "address":"67 AV. SUR Y AV. OLIMPICA, COL. ESCALON, #228, SAN SALVADOR",
          "phone":"6979-7090", "email":"cliente@example.test"
        }
        self.conn.execute("UPDATE control_sales_orders SET proforma_data=? WHERE id='o1'", (json.dumps(source),))
        draft, _ = SERVER.create_fiscal_draft(self.conn,"o1","03","ccf-alias",{"id":"u1","name":"Luis"})
        self.assertEqual(draft["status"], "DRAFT")
        receiver = draft["unsignedPayload"]["receptor"]
        self.assertEqual(receiver["nit"], "06141411131100")
        self.assertEqual(receiver["nrc"], "2304820")
        self.assertEqual(receiver["codActividad"], "65120")
        self.assertEqual(receiver["direccion"], {
          "departamento":"06", "municipio":"23", "distrito":"14",
          "complemento":source["address"]
        })

    def test_unknown_catalog_values_remain_blocked_instead_of_being_guessed(self):
        snapshot = SERVER.fiscal_receiver_snapshot({"client":"Cliente", "proformaData":{
          "businessActivity":"Actividad no catalogada", "department":"Otro",
          "municipality":"Otro", "address":"Dirección"
        }}, "03")
        self.assertEqual(snapshot["codActividad"], "")
        self.assertEqual(snapshot["direccion"]["departamento"], "")
        self.assertEqual(snapshot["direccion"]["municipio"], "")

    def test_local_flow_simulation_never_claims_signature_or_mh_acceptance(self):
        self.insert_order()
        draft, _ = SERVER.create_fiscal_draft(self.conn,"o1","01","draft",{"id":"u1","name":"Luis"})
        run = SERVER.simulate_fiscal_test_flow(self.conn,draft["id"],"simulation",{"id":"u1","name":"Luis"})
        self.assertEqual(run["outcome"], "PASSED")
        self.assertTrue(run["result"]["simulationOnly"])
        self.assertFalse(run["result"]["contactedHacienda"])
        self.assertFalse(run["result"]["signed"])
        self.assertFalse(run["result"]["acceptedByHacienda"])
        stored = self.conn.execute("SELECT status, signed_payload, mh_reception_seal FROM billing_documents WHERE id=?", (draft["id"],)).fetchone()
        self.assertEqual((stored["status"], stored["signed_payload"], stored["mh_reception_seal"]), ("DRAFT", "", None))

    def test_local_flow_simulation_rejects_production_document(self):
        self.insert_order()
        draft, _ = SERVER.create_fiscal_draft(self.conn,"o1","01","draft",{"id":"u1","name":"Luis"})
        self.conn.execute("UPDATE billing_documents SET environment='production' WHERE id=?", (draft["id"],))
        with self.assertRaisesRegex(ValueError,"bloqueada"):
            SERVER.simulate_fiscal_test_flow(self.conn,draft["id"],"simulation",{"id":"u1","name":"Luis"})

    def test_profile_rejects_tampered_totals_and_payments(self):
        identifiers = {"environmentCode":"00", "generationCode":"12345678-1234-4ABC-8DEF-123456789ABC",
                       "controlNumber":"DTE-01-M001P001-000000000000001"}
        issuer = json.loads(self.conn.execute("SELECT issuer_snapshot_json FROM billing_settings WHERE id=1").fetchone()[0])
        receiver = {"nombre":"Cliente Prueba"}
        establishment = {"codEstable":"M001", "codPuntoVenta":"P001"}
        detail = {"sequence":1, "product":"Producto", "quantity":1, "unitPriceCents":11300}
        values = SERVER.fiscal_line_values({**detail, "lineTotalCents":11300, "vatCents":0}, "01")
        payload = SERVER.build_fiscal_payload("01",1,identifiers,issuer,receiver,establishment,
          "2026-10-05","09:30:00",[(detail,values)],11300,1300,11300)
        payload["resumen"]["totalPagar"] = 112.99
        payload["resumen"]["pagos"][0]["montoPago"] = 110
        errors = SERVER.fiscal_payload_profile_errors(payload)
        self.assertTrue(any("totalPagar" in error for error in errors))
        self.assertTrue(any("suma de pagos" in error for error in errors))

    def test_test_draft_does_not_require_reconciliation(self):
        self.insert_order(); self.conn.execute("DELETE FROM billing_source_reviews")
        draft, created = SERVER.create_fiscal_draft(
            self.conn,"o1","01","simulation-without-reconciliation",{"id":"u1","name":"Luis"}
        )
        self.assertTrue(created)
        self.assertEqual(draft["status"], "DRAFT")
        stored = self.conn.execute("SELECT environment, signed_payload, mh_reception_seal FROM billing_documents WHERE id=?", (draft["id"],)).fetchone()
        self.assertEqual(stored["environment"], "development")
        self.assertFalse(stored["signed_payload"])
        self.assertFalse(stored["mh_reception_seal"])
        self.assertEqual(self.conn.execute("SELECT COUNT(*) FROM billing_transmission_attempts").fetchone()[0], 0)

    def test_public_user_payload_never_contains_password(self):
        row=self.conn.execute("SELECT * FROM users WHERE id='u1'").fetchone()
        self.assertNotIn("password",SERVER.user_payload(row))


if __name__ == "__main__": unittest.main()
