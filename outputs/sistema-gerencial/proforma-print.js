const escapePrintHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const printValue = (value) => escapePrintHtml(value) || "&nbsp;";

function printMoney(cents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(Number(cents || 0) / 100);
}

function printDate(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : String(value || "");
}

function readPrintOrder() {
  const key = new URLSearchParams(window.location.search).get("key");
  if (!key) return null;
  try {
    const order = JSON.parse(localStorage.getItem(key) || "null");
    localStorage.removeItem(key);
    return order;
  } catch {
    return null;
  }
}

function renderProforma(order) {
  const data = order.proformaData || {};
  const details = Array.isArray(order.details) ? order.details : [];
  const subtotalCents = Number(order.subtotalCents ?? details.reduce(
    (sum, detail) => sum + Number(detail.lineTotalCents || 0) - Number(detail.vatCents || 0),
    0
  ));
  const vatCents = Number(order.vatTotalCents ?? details.reduce(
    (sum, detail) => sum + Number(detail.vatCents || 0),
    0
  ));
  const perceptionCents = Number(order.perceptionCents ?? Math.max(
    0,
    Number(order.totalCents || 0) - subtotalCents - vatCents
  ));
  const rawOrderNumber = String(order.number || "BORRADOR").trim();
  const printableOrderNumber = /^\d+$/.test(rawOrderNumber)
    ? `OP-${rawOrderNumber.padStart(4, "0")}`
    : rawOrderNumber;
  const invoiceType = order.documentType === "CCF" ? "Credito fiscal" : "Consumidor final";
  const strategies = [
    ["RETENCION", "Retención"],
    ["EXPANSION", "Expansión"],
    ["ATRACCION", "Atracción"],
    ["RECUPERACION", "Recuperación"]
  ];
  const lineRows = details.map((detail) => {
    const baseCents = Number(detail.lineTotalCents || 0) - Number(detail.vatCents || 0);
    const description = [
      detail.product,
      detail.size ? `Talla ${detail.size}` : "",
      detail.notes
    ].filter(Boolean).join(" - ");
    return `<tr>
      <td class="qty">${printValue(detail.quantity)}</td>
      <td>${printValue(description)}</td>
      <td class="money">${printMoney(detail.unitPriceCents)}</td>
      <td class="money">${printMoney(baseCents)}</td>
    </tr>`;
  }).join("");
  const blankRows = Array.from(
    { length: Math.max(0, 12 - details.length) },
    () => `<tr class="blank"><td>&nbsp;</td><td></td><td></td><td></td></tr>`
  ).join("");
  document.title = `Orden de pedido ${printableOrderNumber}`;
  document.querySelector("#proformaRoot").innerHTML = `
    <header class="top">
      <div class="brand-panel">
        <img src="assets/proforma-konfi-arte-color.png" alt="Konfi y Arte y Color">
        <time>${printValue(printDate(order.date))}</time>
      </div>
      <div class="order-panel">
        <h1>ORDEN DE PEDIDO</h1>
        <strong class="order-number">No. ${printValue(printableOrderNumber)}</strong>
        <p>Tipo de Factura: ${printValue(invoiceType)}</p>
      </div>
    </header>
    <section class="fields">
      <div class="field"><label>Vendedor:</label><strong>${printValue(order.seller)}</strong></div>
      <div class="field"><label>Nombre Comercial:</label><strong>${printValue(data.commercialName || order.client)}</strong></div>
      <div class="field"><label>Razon Social:</label><strong>${printValue(data.legalName)}</strong></div>
      <div class="field"><label>Giro:</label><strong>${printValue(data.businessActivity)}</strong></div>
      <div class="field"><label>Encargado/a:</label><strong>${printValue(data.contactName)}</strong></div>
      <div class="field"><label>Telefono:</label><strong>${printValue(data.phone)}</strong></div>
      <div class="field"><label>Direccion:</label><strong>${printValue(data.address)}</strong></div>
      <div class="field"><label>Email:</label><strong>${printValue(data.email)}</strong></div>
      <div class="field"><label>NIT No.:</label><strong>${printValue(data.taxId)}</strong></div>
      <div class="field"><label>Registro No.:</label><strong>${printValue(data.registrationNumber)}</strong></div>
      <div class="field"><label>Tipo de Contribuyente:</label><strong>${printValue(data.taxpayerType)}</strong></div>
      <div class="field"><label>Fecha de Entrega:</label><strong>${printValue(printDate(data.deliveryDate))}</strong></div>
      <div class="field"><label>Condiciones de Pago:</label><strong>${printValue(data.paymentTerms)}</strong></div>
    </section>
    <table class="items">
      <thead><tr><th>CANTIDAD</th><th>DESCRIPCION</th><th>PRECIO<br>UNITARIO</th><th>TOTAL</th></tr></thead>
      <tbody>${lineRows}${blankRows}</tbody>
    </table>
    <section class="closing">
      <div class="notes">Observaciones:<span>${printValue(data.generalNotes)}</span></div>
      <table class="totals"><tbody>
        <tr><th>SUMAS</th><td>${printMoney(subtotalCents)}</td></tr>
        <tr><th>1% PERCEPCION</th><td>${printMoney(perceptionCents)}</td></tr>
        <tr><th>13% IVA</th><td>${printMoney(vatCents)}</td></tr>
        <tr><th>TOTAL</th><td>${printMoney(order.totalCents)}</td></tr>
      </tbody></table>
    </section>
    <section class="strategy-row">
      ${strategies.map(([label, stored]) => `<div class="strategy-item"><span>${label}</span><i class="check">${data.strategy === stored ? "X" : ""}</i></div>`).join("")}
      <div class="customer-code"><span>CODIGO DE CLIENTE NO.:</span><span>${printValue(data.customerCode)}</span></div>
    </section>
    <section class="signatures">
      <div class="signature">CLIENTE O RESPONSABLE</div>
      <div class="signature">REPRESENTANTE</div>
    </section>`;
}

const order = readPrintOrder();
if (order) {
  renderProforma(order);
} else {
  document.querySelector("#proformaRoot").innerHTML = `
    <p class="print-error">No se encontraron datos para generar esta orden de pedido. Cierra esta ventana e inténtalo nuevamente.</p>`;
}

document.querySelector("[data-print]").addEventListener("click", () => window.print());
document.querySelector("[data-close]").addEventListener("click", () => window.close());
