# Contabilidad y facturación electrónica — arquitectura de desarrollo

## Límite de seguridad

Esta fase se ejecuta en una rama y base local aisladas. No transmite DTE, no modifica producción y no genera cuentas por cobrar, ingresos ni pagos. El interruptor `transmission_enabled` nace en `0`; la API de transmisión responde `503` aunque se invoque.

## Diagnóstico comprobado

- La fuente operativa correcta son `control_sales_orders` y `control_sales_details`; se reutilizan clientes, cotizaciones, OP, aprobaciones, precios e IVA existentes.
- `financial_orders` y `accounts_receivable` contienen importes `REAL`; el nuevo libro fiscal usa centavos enteros.
- Consumidor final guarda precios con IVA incluido y puede tener `vat_cents = 0`. Esto no significa venta exenta: `ventaGravada` conserva el precio final, mientras `ivaItem` y `totalIva` revelan el componente IVA calculado mediante `total - (total × 100 / 113)`, sin volver a sumarlo al total de la operación.
- Crédito fiscal reutiliza el IVA explícito de cada línea y bloquea la validación local si faltan NIT o NRC.
- El endpoint `/api/users` exponía contraseñas y el sistema confiaba en `X-System-User-Id`. La respuesta de usuarios ya omite contraseñas. Las rutas fiscales solo aceptan `Bearer` emitido por autenticación verificada en servidor.
- Las migraciones antiguas viven dentro de `init_db`. El módulo nuevo inaugura `schema_migrations` con archivos versionados y checksum inmutable.

## Flujo inicial

1. Listar OP existentes sin duplicarlas.
2. Revisar cada OP histórica como `PENDING_RECONCILIATION`, `CONFIRMED_UNBILLED` o `EXTERNAL_BILLED`.
3. Bloquear preparación mientras no esté confirmada como no facturada.
4. Crear borrador completo e idempotente, tomando una fotografía de cliente, OP y líneas.
5. Validar localmente datos y aritmética. Esto **no equivale** a aceptación de Hacienda.
6. Firmar, transmitir, consultar estado, archivar JSON/PDF y crear eventos serán fases posteriores, después de incorporar esquemas oficiales y credenciales reales.

Las OP marcadas como facturadas externamente no pueden reemitirse. La facturación parcial queda modelada, pero bloqueada hasta aprobar reglas de anticipos, notas y cantidades remanentes.

## Estados separados

- OP: conserva sus estados operativos y aprobaciones actuales.
- Conciliación fiscal: pendiente, confirmada sin facturar o facturada externamente.
- DTE: borrador, error local, validado, firma, firmado, envío, aceptado, rechazado, contingencia e invalidación.
- Pago/CxC: no se toca durante esta fase. La aceptación futura deberá publicar un único evento contable idempotente para evitar duplicados.

## Libro fiscal autónomo

La migración `002_autonomous_billing.sql` crea `billing_document_types`, `billing_settings`,
`billing_source_reviews`, `billing_documents`, `billing_document_lines`,
`billing_document_taxes`, `billing_document_payments`, `billing_related_documents`,
`billing_transmission_attempts`, `billing_events`, `billing_files` y `billing_audit`.

Ninguna tabla `billing_*` tiene claves foráneas hacia OP, clientes, Producción, Despacho,
Entrega o usuarios. `source_type`, `source_id`, `source_number` y `source_line_id` son
referencias informativas. En el momento de preparar un DTE se copian fotografías
inmutables del emisor, receptor, origen y líneas; una modificación posterior del sistema
operativo no altera el documento fiscal.

Las tablas `fiscal_*` de la primera fase quedan únicamente como legado de migración local.
La API fiscal trabaja desde la segunda fase exclusivamente sobre `billing_*`.

La migración `003_dte_payload_generation.sql` agrega secuencias independientes para
el número de control y evidencia de cada validación. El generador local produce la
estructura JSON para Factura `01` y Comprobante de crédito fiscal `03` versión 4,
incluyendo identificación, emisor, receptor, líneas, tributos, pagos y resumen. El
código de generación usa UUID v4 y el número de control se asigna de forma transaccional.
Si faltan los códigos autorizados del establecimiento/punto de venta o datos obligatorios
del receptor, el documento queda `LOCAL_VALIDATION_FAILED` y no puede considerarse DTE.

La migración `004_dte_validation_profiles.sql` registra los perfiles locales usados para
Factura `01` versión 1 y CCF `03` versión 4. El validador comprueba estructura mínima,
UUID v4, número de control, fechas, emisor, receptor, líneas, IVA, descuentos, retenciones,
total de operación, total a pagar y formas de pago. El indicador
`official_schema_embedded` permanece en `0`: estas reglas reforzadas no se presentan como
el paquete JSON Schema oficial ni sustituyen la validación del receptor de Hacienda.

La migración `005_quarantine_legacy_drafts.sql` conserva los borradores anteriores al
generador, pero los marca `LOCAL_VALIDATION_FAILED` cuando no contienen JSON DTE. Un
borrador fallido no bloquea preparar su reemplazo corregido; un borrador válido, firmado,
en envío o aceptado sí conserva el bloqueo contra duplicados.

## Representación local

Cada documento preparado ofrece una vista previa imprimible inspirada en representaciones
reales de Factura de consumidor final y Comprobante de crédito fiscal. Muestra emisor,
receptor, identificación, líneas, ventas no sujetas/exentas/gravadas, totales, valor en
letras, condición y espacios de entrega/recepción. Mientras el documento no tenga estado
`ACCEPTED` y sello de recepción, la hoja se identifica de forma visible como
`BORRADOR LOCAL · NO TRANSMITIDO`, no genera QR de Hacienda y no puede presentarse como
comprobante fiscal válido. El botón de impresión únicamente imprime o guarda esa vista
local; no firma ni transmite el JSON.

No se altera el esquema ni el contenido de tablas existentes.

## Decisiones pendientes antes de transmisión

- Confirmar NIT, NRC, actividad, dirección, establecimientos, puntos de venta y ambientes del emisor.
- Incorporar y probar los JSON Schema vigentes de tipos 01 y 03.
- Elegir/validar firmador compatible y custodia del certificado; ningún secreto irá al navegador ni a la base en texto abierto.
- Aprobar correlativos, códigos de generación, contingencia, invalidación y documentos relacionados.
- Aprobar el asiento contable y el momento exacto de creación de CxC/ingreso/impuestos.
- Resolver por separado las dos relaciones foráneas preexistentes registradas en el baseline.

## Migración futura a producción

Solo después de aprobación: respaldo consistente, ensayo de restauración, comparación contra el baseline, ventana de mantenimiento, migración versionada, pruebas de humo, transmisión todavía apagada y plan de reversión. Encender transmisión requiere una aprobación distinta.
