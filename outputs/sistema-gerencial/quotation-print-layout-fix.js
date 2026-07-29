(() => {
  const STYLE_ID = "quotation-print-layout-fix";
  const TABLE_CLASS = "quotation-print-products";

  const printStyles = `
    table.${TABLE_CLASS} {
      width: 100% !important;
      table-layout: fixed !important;
      border-collapse: collapse !important;
    }

    table.${TABLE_CLASS} th,
    table.${TABLE_CLASS} td {
      box-sizing: border-box !important;
      max-width: 0 !important;
    }

    table.${TABLE_CLASS} th:nth-child(1),
    table.${TABLE_CLASS} td:nth-child(1) { width: 9% !important; }

    table.${TABLE_CLASS} th:nth-child(2),
    table.${TABLE_CLASS} td:nth-child(2) { width: 58% !important; }

    table.${TABLE_CLASS} th:nth-child(3),
    table.${TABLE_CLASS} td:nth-child(3) { width: 17% !important; }

    table.${TABLE_CLASS} th:nth-child(4),
    table.${TABLE_CLASS} td:nth-child(4) { width: 16% !important; }

    table.${TABLE_CLASS} tbody tr,
    table.${TABLE_CLASS} tbody td {
      height: auto !important;
      min-height: 0 !important;
    }

    table.${TABLE_CLASS} td:nth-child(2) {
      white-space: pre-wrap !important;
      overflow-wrap: anywhere !important;
      word-wrap: break-word !important;
      word-break: break-word !important;
      hyphens: auto !important;
      overflow: hidden !important;
      vertical-align: top !important;
      line-height: 1.28 !important;
    }

    table.${TABLE_CLASS} td:nth-child(2) * {
      max-width: 100% !important;
      white-space: inherit !important;
      overflow-wrap: anywhere !important;
      word-break: break-word !important;
    }

    table.${TABLE_CLASS} td:nth-child(3),
    table.${TABLE_CLASS} td:nth-child(4) {
      white-space: nowrap !important;
      overflow: hidden !important;
      vertical-align: middle !important;
    }

    @media print {
      table.${TABLE_CLASS} tbody tr {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
    }
  `;

  const normalize = (value) =>
    String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toUpperCase();

  const protectQuotationTable = (doc) => {
    if (!doc?.documentElement) return;

    if (!doc.getElementById(STYLE_ID)) {
      const style = doc.createElement("style");
      style.id = STYLE_ID;
      style.textContent = printStyles;
      (doc.head || doc.documentElement).appendChild(style);
    }

    doc.querySelectorAll("table").forEach((table) => {
      const headers = [...table.querySelectorAll("thead th, tr:first-child th")]
        .map((cell) => normalize(cell.textContent));

      const isQuotationProductsTable =
        headers.length >= 4 &&
        headers.some((text) => text.includes("DESCRIPCION")) &&
        headers.some((text) => text.includes("PRECIO")) &&
        headers.some((text) => text.includes("TOTAL"));

      if (isQuotationProductsTable) table.classList.add(TABLE_CLASS);
    });
  };

  const watchDocument = (doc) => {
    if (!doc?.documentElement) return;
    protectQuotationTable(doc);

    const observer = new MutationObserver(() => protectQuotationTable(doc));
    observer.observe(doc.documentElement, { childList: true, subtree: true });

    window.setTimeout(() => observer.disconnect(), 15000);
  };

  const watchPopup = (popup) => {
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      try {
        if (popup.closed || attempts > 200) {
          window.clearInterval(timer);
          return;
        }
        watchDocument(popup.document);
        if (popup.document?.readyState === "complete") window.clearInterval(timer);
      } catch (_) {
        if (attempts > 200) window.clearInterval(timer);
      }
    }, 50);
  };

  const nativeOpen = window.open.bind(window);
  window.open = (...args) => {
    const popup = nativeOpen(...args);
    if (popup) watchPopup(popup);
    return popup;
  };

  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("iframe").forEach((frame) => {
      try {
        watchDocument(frame.contentDocument);
      } catch (_) {
        // Los iframes de otro origen no forman parte de la vista previa local.
      }
    });
  });
})();
