/* Dedicated renderer loaded after app.js so Labor Reserve projection changes
   are independent from the main application bundle cache. */
function renderLaborReserve() {
  const data = state.laborReserve;
  if (!data) return `<section class="labor-reserve-panel"><p class="labor-reserve-state">Cargando reserva laboral...</p></section>`;
  if (data.error) return `<section class="labor-reserve-panel"><p class="labor-reserve-state">${escapeHtml(data.error)}</p></section>`;
  const row = (label, value) => `<tr><th>${escapeHtml(label)}</th><td>${formatMoney(value)}</td></tr>`;
  return `<section class="labor-reserve-panel"><header><span>Financiera</span><h2>Reserva Laboral</h2></header>
    <div class="labor-reserve-operations">
      <section class="labor-reserve-operation"><header><span>Operación 1</span><h3>Compromisos laborales</h3></header><table><tbody>
        ${row("Aguinaldo", data.commitments?.bonus)}${row("Indemnización", data.commitments?.severance)}${row("Vacación proporcional", data.commitments?.proportionalVacation)}
        <tr class="subtotal"><th>Subtotal operación 1</th><td>${formatMoney(data.laborCommitments)}</td></tr>
      </tbody></table></section>
      <section class="labor-reserve-operation"><header><span>Operación 2</span><h3>Compromisos de diciembre</h3></header><table><tbody>
        ${row("Gastos diciembre", data.commitments?.decemberExpenses)}${row("Quincena 25", data.commitments?.payroll25)}
        <tr class="subtotal"><th>Subtotal operación 2</th><td>${formatMoney(data.decemberCommitments)}</td></tr>
      </tbody></table></section>
    </div>
    <table class="labor-reserve-summary"><tbody>
      <tr class="total"><th><strong>Total compromisos</strong><small>${formatMoney(data.laborCommitments)} + ${formatMoney(data.decemberCommitments)}</small></th><td>${formatMoney(data.totalCommitments)}</td></tr>
      <tr class="reserve"><th>Reserva Azul Laboral</th><td>${formatMoney(data.laborReserveBalance)}</td></tr>
      <tr class="need"><th><strong>Necesidad de reserva</strong><small>${formatMoney(data.totalCommitments)} − ${formatMoney(data.laborReserveBalance)}</small></th><td>${formatMoney(data.reserveNeed)}</td></tr>
      <tr class="receivables-provision"><th><strong>Provisión de cuentas por cobrar</strong><small>${formatMoney(data.receivablesBalance)} ÷ 1.1475 × 7%</small></th><td>− ${formatMoney(data.receivablesReserve)}</td></tr>
      <tr class="projected-need"><th><strong>Necesidad proyectada</strong><small>${formatMoney(data.reserveNeed)} − ${formatMoney(data.receivablesReserve)}</small></th><td>${formatMoney(data.projectedReserveNeed)}</td></tr>
    </tbody></table>
  </section>`;
}

if (state.activeArea === "financiera" && state.activeSubmenu === "reserva-laboral") {
  renderCommercialSubmenu(areas.financiera);
}
