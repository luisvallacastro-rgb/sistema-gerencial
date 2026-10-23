import unittest
from pathlib import Path


APP_JS = Path(__file__).parents[1] / "outputs" / "sistema-gerencial" / "app.js"


class QuotationExcelExportTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.source = APP_JS.read_text(encoding="utf-8")

    def test_print_preview_exposes_excel_action(self):
        self.assertIn("data-export-quotation-excel", self.source)
        self.assertIn("Exportar a Excel", self.source)
        self.assertIn('exportQuotationToExcel(quote)', self.source)

    def test_export_contains_quotation_financial_and_commercial_fields(self):
        for label in (
            "CANT.",
            "DESCRIPCIÓN",
            "PRECIO UNITARIO",
            "SUBTOTAL",
            "IVA 13%",
            "TOTAL",
            "Vigencia de oferta",
            "Tiempo de entrega",
            "Forma de pago",
            "Observaciones",
        ):
            self.assertIn(label, self.source)

    def test_export_is_an_excel_download_and_does_not_write_to_api(self):
        export_block = self.source.split("async function exportQuotationToExcel(quote)", 1)[1].split("async function exportQuotationToLegacyExcel(quote)", 1)[0]
        self.assertIn('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', self.source)
        self.assertIn('.xlsx`', export_block)
        self.assertIn("URL.createObjectURL", export_block)
        self.assertNotIn("apiJson(", export_block)

    def test_export_embeds_all_brand_images(self):
        export_block = self.source.split("async function exportQuotationToExcel(quote)", 1)[1].split("async function exportQuotationToLegacyExcel(quote)", 1)[0]
        self.assertIn('assets/arte-color-uniformes-logo.png', export_block)
        self.assertIn('assets/konfi-quote-logo.png', export_block)
        self.assertIn('assets/arte-color-uniformes-qr.jpg', export_block)
        self.assertIn('["xl/media/image1.png", images[0]]', export_block)
        self.assertIn('["xl/media/image2.png", images[1]]', export_block)
        self.assertIn('["xl/media/image3.jpg", images[2]]', export_block)
        self.assertIn('drawing1.xml', export_block)


if __name__ == "__main__":
    unittest.main()
