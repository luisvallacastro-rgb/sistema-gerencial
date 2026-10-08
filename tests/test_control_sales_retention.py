import importlib.util
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "kmi_server_control_sales_retention",
    ROOT / "outputs/sistema-gerencial/server.py",
)
SERVER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(SERVER)


class ControlSalesRetentionTests(unittest.TestCase):
    def test_one_percent_retention_is_informative_and_does_not_change_total(self):
        order = SERVER.control_sales_validate({
            "number": "2026100047",
            "seller": "Marco Velado",
            "date": "2026-10-08",
            "client": "Sherwin Williams",
            "documentType": "CCF",
            "proformaData": {"perceptionEnabled": True},
            "details": [{
                "product": "Pantalones estilo comando con reflectivo",
                "quantity": "12",
                "unitPriceCents": 4021,
            }],
        })

        self.assertEqual(order["subtotalCents"], 48252)
        self.assertEqual(order["vatTotalCents"], 6273)
        self.assertEqual(order["perceptionCents"], 483)
        self.assertEqual(order["totalCents"], 54525)


if __name__ == "__main__":
    unittest.main()
