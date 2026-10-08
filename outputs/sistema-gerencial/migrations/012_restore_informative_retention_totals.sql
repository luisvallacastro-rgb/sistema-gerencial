INSERT INTO control_sales_audit (order_id, action, user_name, created_at, summary)
SELECT
    orders.id,
    'correccion_retencion_informativa',
    'Sistema Gerencial',
    CURRENT_TIMESTAMP,
    'Total restaurado: la retención del 1% es informativa y no modifica el valor gravado más IVA'
FROM control_sales_orders AS orders
WHERE COALESCE(json_extract(orders.proforma_data, '$.perceptionEnabled'), 0) = 1
  AND EXISTS (
      SELECT 1 FROM control_sales_details AS details
      WHERE details.order_id = orders.id AND details.active = 1
  )
  AND orders.total_cents <> (
      SELECT COALESCE(SUM(details.line_total_cents), 0)
      FROM control_sales_details AS details
      WHERE details.order_id = orders.id AND details.active = 1
  );

UPDATE control_sales_orders
SET
    total_cents = (
        SELECT COALESCE(SUM(details.line_total_cents), 0)
        FROM control_sales_details AS details
        WHERE details.order_id = control_sales_orders.id AND details.active = 1
    ),
    expected_total_cents = (
        SELECT COALESCE(SUM(details.line_total_cents), 0)
        FROM control_sales_details AS details
        WHERE details.order_id = control_sales_orders.id AND details.active = 1
    ),
    variance_cents = 0,
    updated_at = CURRENT_TIMESTAMP,
    updated_by = 'Sistema Gerencial'
WHERE COALESCE(json_extract(proforma_data, '$.perceptionEnabled'), 0) = 1
  AND EXISTS (
      SELECT 1 FROM control_sales_details AS details
      WHERE details.order_id = control_sales_orders.id AND details.active = 1
  );
