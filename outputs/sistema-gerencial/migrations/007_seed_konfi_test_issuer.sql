-- Complete the isolated development profile used to build printable DTE samples.
-- This only updates billing_settings; it never changes operational orders or customers.
UPDATE billing_settings
SET issuer_snapshot_json = '{"nit":"06142008211044","nrc":"3067154","nombre":"KONFI INVERSIONES S.A. DE C.V.","nombreComercial":"ARTE Y COLOR","codActividad":"14109","descActividad":"Fabricación de prendas y accesorios de vestir n.c.p.","tipoEstablecimiento":"02","direccion":{"departamento":"06","municipio":"23","complemento":"CALLE SAN PABLO N 76 BLOCK B, REPARTO LOS SANTOS 1, SOYAPANGO, SAN SALVADOR"},"telefono":"22772032","correo":"Info@konfiinversiones.com"}',
    updated_by_name = 'Inicialización segura de demostración',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1
  AND environment = 'development'
  AND (issuer_snapshot_json IS NULL OR trim(issuer_snapshot_json) = '' OR trim(issuer_snapshot_json) = '{}');
