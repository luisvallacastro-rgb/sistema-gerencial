-- Autonomous electronic billing ledger.
-- Operational modules are sources only: no foreign key points to orders,
-- production, dispatch, delivery, customers, or users.

CREATE TABLE IF NOT EXISTS billing_document_types (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    schema_version INTEGER NOT NULL CHECK (schema_version > 0),
    active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1))
);

INSERT OR IGNORE INTO billing_document_types (code, name, schema_version) VALUES
    ('01', 'Factura', 1),
    ('03', 'Comprobante de crédito fiscal', 3);

CREATE TABLE IF NOT EXISTS billing_settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    environment TEXT NOT NULL DEFAULT 'development' CHECK (environment IN ('development', 'test', 'production')),
    transmission_enabled INTEGER NOT NULL DEFAULT 0 CHECK (transmission_enabled IN (0, 1)),
    allow_partial_invoicing INTEGER NOT NULL DEFAULT 0 CHECK (allow_partial_invoicing IN (0, 1)),
    issuer_snapshot_json TEXT NOT NULL DEFAULT '{}',
    establishment_snapshot_json TEXT NOT NULL DEFAULT '{}',
    updated_by_id TEXT NOT NULL DEFAULT '',
    updated_by_name TEXT NOT NULL DEFAULT 'Sistema Gerencial',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO billing_settings
    (id, environment, transmission_enabled, allow_partial_invoicing,
     issuer_snapshot_json, establishment_snapshot_json, updated_by_name, updated_at)
SELECT id, environment, transmission_enabled, allow_partial_invoicing,
       emitter_json, establishment_json, updated_by, updated_at
FROM fiscal_settings WHERE id = 1;

INSERT OR IGNORE INTO billing_settings (id) VALUES (1);

CREATE TABLE IF NOT EXISTS billing_source_reviews (
    source_type TEXT NOT NULL,
    source_id TEXT NOT NULL,
    source_number TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'PENDING_RECONCILIATION'
        CHECK (status IN ('PENDING_RECONCILIATION', 'CONFIRMED_UNBILLED', 'EXTERNAL_BILLED')),
    external_document_type TEXT NOT NULL DEFAULT '',
    external_document_number TEXT NOT NULL DEFAULT '',
    notes TEXT NOT NULL DEFAULT '',
    source_snapshot_json TEXT NOT NULL DEFAULT '{}',
    reviewed_by_id TEXT NOT NULL DEFAULT '',
    reviewed_by_name TEXT NOT NULL DEFAULT '',
    reviewed_at TEXT,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (source_type, source_id)
);

CREATE INDEX IF NOT EXISTS idx_billing_source_reviews_status
    ON billing_source_reviews(status, updated_at DESC);

INSERT OR IGNORE INTO billing_source_reviews
    (source_type, source_id, source_number, status, external_document_type,
     external_document_number, notes, source_snapshot_json, reviewed_by_id,
     reviewed_by_name, reviewed_at, updated_at)
SELECT 'ORDER', r.order_id, COALESCE(o.order_number, ''), r.status,
       r.external_document_type, r.external_document_number, r.notes,
       json_object(
         'id', o.id, 'number', o.order_number, 'date', o.order_date,
         'client', o.client, 'seller', o.seller, 'documentType', o.document_type,
         'totalCents', o.total_cents
       ),
       COALESCE(r.reviewed_by_user_id, ''), r.reviewed_by_name,
       r.reviewed_at, r.updated_at
FROM fiscal_order_reconciliations r
LEFT JOIN control_sales_orders o ON o.id = r.order_id;

CREATE TABLE IF NOT EXISTS billing_documents (
    id TEXT PRIMARY KEY,
    idempotency_key TEXT NOT NULL UNIQUE,
    source_type TEXT NOT NULL,
    source_id TEXT NOT NULL,
    source_number TEXT NOT NULL DEFAULT '',
    document_type TEXT NOT NULL REFERENCES billing_document_types(code),
    schema_version INTEGER NOT NULL CHECK (schema_version > 0),
    status TEXT NOT NULL DEFAULT 'DRAFT'
        CHECK (status IN ('DRAFT', 'LOCAL_VALIDATION_FAILED', 'LOCALLY_VALIDATED',
                          'SIGNING', 'SIGNED', 'SENDING', 'ACCEPTED', 'REJECTED',
                          'CONTINGENCY', 'INVALIDATION_PENDING', 'INVALIDATED')),
    environment TEXT NOT NULL DEFAULT 'development' CHECK (environment IN ('development', 'test', 'production')),
    emission_date TEXT NOT NULL,
    emission_time TEXT NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    generation_code TEXT UNIQUE,
    control_number TEXT UNIQUE,
    mh_reception_seal TEXT UNIQUE,
    transmission_model INTEGER NOT NULL DEFAULT 1 CHECK (transmission_model IN (1, 2)),
    operation_type INTEGER NOT NULL DEFAULT 1 CHECK (operation_type IN (1, 2)),
    contingency_type INTEGER,
    contingency_reason TEXT NOT NULL DEFAULT '',
    issuer_snapshot_json TEXT NOT NULL,
    receiver_snapshot_json TEXT NOT NULL,
    source_snapshot_json TEXT NOT NULL,
    validation_json TEXT NOT NULL DEFAULT '{}',
    unsigned_payload_json TEXT NOT NULL DEFAULT '{}',
    signed_payload TEXT NOT NULL DEFAULT '',
    mh_response_json TEXT NOT NULL DEFAULT '{}',
    non_subject_cents INTEGER NOT NULL DEFAULT 0 CHECK (non_subject_cents >= 0),
    exempt_cents INTEGER NOT NULL DEFAULT 0 CHECK (exempt_cents >= 0),
    taxable_cents INTEGER NOT NULL DEFAULT 0 CHECK (taxable_cents >= 0),
    discount_cents INTEGER NOT NULL DEFAULT 0 CHECK (discount_cents >= 0),
    vat_cents INTEGER NOT NULL DEFAULT 0 CHECK (vat_cents >= 0),
    vat_withheld_cents INTEGER NOT NULL DEFAULT 0 CHECK (vat_withheld_cents >= 0),
    vat_perceived_cents INTEGER NOT NULL DEFAULT 0 CHECK (vat_perceived_cents >= 0),
    income_tax_withheld_cents INTEGER NOT NULL DEFAULT 0 CHECK (income_tax_withheld_cents >= 0),
    other_non_taxable_cents INTEGER NOT NULL DEFAULT 0 CHECK (other_non_taxable_cents >= 0),
    total_operation_cents INTEGER NOT NULL DEFAULT 0 CHECK (total_operation_cents >= 0),
    total_payable_cents INTEGER NOT NULL DEFAULT 0 CHECK (total_payable_cents >= 0),
    amount_in_words TEXT NOT NULL DEFAULT '',
    immutable_at TEXT,
    created_by_id TEXT NOT NULL DEFAULT '',
    created_by_name TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_billing_documents_source
    ON billing_documents(source_type, source_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_billing_documents_status
    ON billing_documents(status, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS uq_billing_active_source
    ON billing_documents(source_type, source_id)
    WHERE status NOT IN ('REJECTED', 'INVALIDATED');

CREATE TABLE IF NOT EXISTS billing_document_lines (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES billing_documents(id) ON DELETE RESTRICT,
    source_line_id TEXT NOT NULL DEFAULT '',
    sequence INTEGER NOT NULL CHECK (sequence > 0),
    item_type INTEGER NOT NULL DEFAULT 1,
    item_code TEXT NOT NULL DEFAULT '',
    tax_code TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL,
    unit_measure_code INTEGER NOT NULL DEFAULT 59,
    quantity_millis INTEGER NOT NULL CHECK (quantity_millis > 0),
    unit_price_cents INTEGER NOT NULL CHECK (unit_price_cents >= 0),
    discount_cents INTEGER NOT NULL DEFAULT 0 CHECK (discount_cents >= 0),
    non_subject_cents INTEGER NOT NULL DEFAULT 0 CHECK (non_subject_cents >= 0),
    exempt_cents INTEGER NOT NULL DEFAULT 0 CHECK (exempt_cents >= 0),
    taxable_cents INTEGER NOT NULL DEFAULT 0 CHECK (taxable_cents >= 0),
    vat_cents INTEGER NOT NULL DEFAULT 0 CHECK (vat_cents >= 0),
    other_non_taxable_cents INTEGER NOT NULL DEFAULT 0 CHECK (other_non_taxable_cents >= 0),
    total_cents INTEGER NOT NULL CHECK (total_cents >= 0),
    tax_codes_json TEXT NOT NULL DEFAULT '[]',
    source_snapshot_json TEXT NOT NULL DEFAULT '{}',
    UNIQUE(document_id, sequence)
);

CREATE TABLE IF NOT EXISTS billing_document_taxes (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES billing_documents(id) ON DELETE RESTRICT,
    code TEXT NOT NULL,
    description TEXT NOT NULL,
    amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
    UNIQUE(document_id, code)
);

CREATE TABLE IF NOT EXISTS billing_document_payments (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES billing_documents(id) ON DELETE RESTRICT,
    sequence INTEGER NOT NULL CHECK (sequence > 0),
    payment_code TEXT NOT NULL,
    amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
    reference TEXT NOT NULL DEFAULT '',
    term_code TEXT NOT NULL DEFAULT '',
    term_period INTEGER,
    UNIQUE(document_id, sequence)
);

CREATE TABLE IF NOT EXISTS billing_related_documents (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES billing_documents(id) ON DELETE RESTRICT,
    relation_type INTEGER NOT NULL,
    related_document_type TEXT NOT NULL,
    generation_type INTEGER NOT NULL,
    generation_code TEXT NOT NULL DEFAULT '',
    document_number TEXT NOT NULL DEFAULT '',
    document_date TEXT NOT NULL,
    UNIQUE(document_id, relation_type, generation_code, document_number)
);

CREATE TABLE IF NOT EXISTS billing_transmission_attempts (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES billing_documents(id) ON DELETE RESTRICT,
    idempotency_key TEXT NOT NULL UNIQUE,
    attempt_number INTEGER NOT NULL CHECK (attempt_number > 0),
    environment TEXT NOT NULL CHECK (environment IN ('development', 'test', 'production')),
    outcome TEXT NOT NULL CHECK (outcome IN ('PENDING', 'ACCEPTED', 'REJECTED', 'UNKNOWN', 'ERROR')),
    http_status INTEGER,
    request_json TEXT NOT NULL DEFAULT '{}',
    response_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL,
    completed_at TEXT
);

CREATE TABLE IF NOT EXISTS billing_events (
    id TEXT PRIMARY KEY,
    document_id TEXT REFERENCES billing_documents(id) ON DELETE RESTRICT,
    event_type TEXT NOT NULL,
    status TEXT NOT NULL,
    generation_code TEXT NOT NULL DEFAULT '',
    mh_reception_seal TEXT NOT NULL DEFAULT '',
    payload_json TEXT NOT NULL DEFAULT '{}',
    created_by_id TEXT NOT NULL DEFAULT '',
    created_by_name TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS billing_files (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES billing_documents(id) ON DELETE RESTRICT,
    kind TEXT NOT NULL CHECK (kind IN ('UNSIGNED_JSON', 'SIGNED_JSON', 'MH_RESPONSE', 'PDF')),
    relative_path TEXT NOT NULL,
    sha256 TEXT NOT NULL,
    size_bytes INTEGER NOT NULL DEFAULT 0 CHECK (size_bytes >= 0),
    created_at TEXT NOT NULL,
    UNIQUE(document_id, kind)
);

CREATE TABLE IF NOT EXISTS billing_audit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document_id TEXT REFERENCES billing_documents(id) ON DELETE RESTRICT,
    source_type TEXT NOT NULL DEFAULT '',
    source_id TEXT NOT NULL DEFAULT '',
    action TEXT NOT NULL,
    actor_id TEXT NOT NULL DEFAULT '',
    actor_name TEXT NOT NULL,
    detail_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_billing_audit_document
    ON billing_audit(document_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_billing_audit_source
    ON billing_audit(source_type, source_id, created_at DESC);

-- Preserve local phase-one drafts as autonomous snapshots.
INSERT OR IGNORE INTO billing_documents
    (id, idempotency_key, source_type, source_id, source_number, document_type,
     schema_version, status, environment, emission_date, emission_time,
     issuer_snapshot_json, receiver_snapshot_json, source_snapshot_json,
     validation_json, taxable_cents, vat_cents, total_operation_cents,
     total_payable_cents, generation_code, control_number, mh_reception_seal,
     immutable_at, created_by_id, created_by_name, created_at, updated_at)
SELECT d.id, d.idempotency_key, 'ORDER', d.order_id,
       COALESCE(json_extract(d.order_snapshot_json, '$.number'), ''),
       d.document_type,
       CASE d.document_type WHEN '03' THEN 3 ELSE 1 END,
       d.status, COALESCE(s.environment, 'development'), d.fiscal_date, d.fiscal_time,
       COALESCE(s.emitter_json, '{}'), d.customer_snapshot_json, d.order_snapshot_json,
       d.validation_json, d.subtotal_cents, d.vat_cents, d.total_cents, d.total_cents,
       d.generation_code, d.control_number, d.mh_seal, d.immutable_at,
       d.created_by_user_id, d.created_by_name, d.created_at, d.updated_at
FROM fiscal_documents d
LEFT JOIN fiscal_settings s ON s.id = 1;

INSERT OR IGNORE INTO billing_document_lines
    (id, document_id, source_line_id, sequence, description, quantity_millis,
     unit_price_cents, discount_cents, non_subject_cents, exempt_cents,
     taxable_cents, vat_cents, total_cents, tax_codes_json, source_snapshot_json)
SELECT id, document_id, source_detail_id, sequence, description, quantity_millis,
       unit_price_cents, discount_cents, non_subject_cents, exempt_cents,
       taxable_cents, vat_cents, total_cents,
       CASE WHEN vat_cents > 0 THEN '["20"]' ELSE '[]' END,
       source_snapshot_json
FROM fiscal_document_lines;

INSERT INTO billing_audit
    (document_id, source_type, source_id, action, actor_id, actor_name, detail_json, created_at)
SELECT document_id, 'ORDER', COALESCE(order_id, ''), action,
       COALESCE(actor_user_id, ''), actor_name, detail_json, created_at
FROM fiscal_audit
WHERE NOT EXISTS (
    SELECT 1 FROM billing_audit b
    WHERE b.action = fiscal_audit.action
      AND b.source_type = 'ORDER'
      AND b.source_id = COALESCE(fiscal_audit.order_id, '')
      AND b.created_at = fiscal_audit.created_at
);
