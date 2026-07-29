(() => {
  "use strict";

  const originalOpen = window.open.bind(window);

  function protectQuotationTables(popup) {
    if (!popup || popup.closed) return;

    try {
      const doc = popup.document;
      if (!doc?.documentElement) return;

      const quotationTables = Array.from(doc.querySelectorAll("table")).filter((table) => {
        const heading = table.querySelector("thead")?.textContent || table.rows?.[0]?.textContent || "";
        const normalized = heading.toUpperCase();
        return normalized.includes("DESCRIPCI") && normalized.includes("PRECIO") && normalized.includes("TOTAL");
      });

      if (!quotationTables.length) return;

      quotationTables.forEach((table) => table.classList.add("quotation-products-table"));

      if (doc.getElementById("quotation-print-wrap-guard")) return;

      const style = doc.createElement("style");
      style.id = "quotation-print-wrap-guard";
      style.textContent = `
        table.quotation-products-table {
          width: 100% !important;
          table-layout: fixed !important;
          border-collapse: collapse !important;
        }

        table.quotation-products-table th,
        table.quotation-products-table td {
          box-sizing: border-box !important;
          min-width: 0 !important;
        }

        table.quotation-products-table th:nth-child(1),
        table.quotation-products-table td:nth-child(1) {
          width: 9% !important;
        }

        table.quotation-products-table th:nth-child(2),
        table.quotation-products-table td:nth-child(2) {
          width: 58% !important;
        }

        table.quotation-products-table th:nth-child(3),
        table.quotation-products-table td:nth-child(3) {
          width: 17% !important;
        }

        table.quotation-products-table th:nth-child(4),
        table.quotation-products-table td:nth-child(4) {
          width: 16% !important;
        }

        table.quotation-products-table td:nth-child(2),
        table.quotation-products-table td:nth-child(2) * {
          white-space: pre-wrap !important;
          overflow-wrap: anywhere !important;
          word-break: break-word !important;
          hyphens: auto;
        }

        table.quotation-products-table td:nth-child(3),
        table.quotation-products-table td:nth-child(4) {
          white-space: nowrap !important;
          overflow: hidden !important;
        }

        table.quotation-products-table tbody tr,
        table.quotation-products-table tbody td {
          height: auto !important;
          min-height: 38px;
          vertical-align: middle !important;
        }
      `;
      doc.head.appendChild(style);
    } catch (_error) {
      // El navegador puede bloquear ventanas externas; las vistas internas siguen funcionando.
    }
  }

  window.open = (...args) => {
    const popup = originalOpen(...args);
    if (!popup) return popup;

    [0, 40, 120, 300, 700].forEach((delay) => {
      window.setTimeout(() => protectQuotationTables(popup), delay);
    });

    return popup;
  };
})();
