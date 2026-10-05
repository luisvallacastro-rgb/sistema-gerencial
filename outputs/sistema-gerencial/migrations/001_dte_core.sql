CREATE TABLE IF NOT EXISTS auth_sessions (
    id TEXT PRIMARY KEY,
    token_hash TEXT NOT NULL UNIQUE,
    user_id TEXT NOT NULL REFERENCES users(id),
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    revoked_at TEXT,
    user_agent TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_auth_sessions_user ON auth_sessions(user_id, expires_at);

CREATE TABLE IF NOT EXISTS fiscal_settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    environment TEXT NOT NULL DEFAULT 'development' CHECK (environment IN ('development', 'test', 'production')),
    transmission_enabled INTEGER NOT NULL DEFAULT 0 CHECK (transmission_enabled IN (0, 1)),
    allow_partial_invoicing INTEGER NOT NULL DEFAULT 0 CHECK (allow_partial_invoicing IN (0, 1)),
    emitter_json TEXT NOT NULL DEFAULT '{}',
    establishment_json TEXT NOT NULL DEFAULT '{}',
    updated_by TEXT NOT NULL DEFAULT 'Sistema Gerencial',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO fiscal_settings (id) VALUES (1);

CREATE TABLE IF NOT EXISTS fiscal_order_reconciliations (
    order_id TEXT PRIMARY KEY REFERENCES control_sales_orders(id),
    status TEXT NOT NULL DEFAULT 'PENDING_RECONCILIATION'
        CHECK (status IN ('PENDING_RECONCILIATION', 'CONFIRMED_UNBILLED', 'EXTERNAL_BILLED')),
    external_document_type TEXT NOT NULL DEFAULT '',
    external_document_number TEXT NOT NULL DEFAULT '',
    notes TEXT NOT NULL DEFAULT '',
    reviewed_by_user_id TEXT REFERENCES users(id),
    reviewed_by_name TEXT NOT NULL DEFAULT '',
    reviewed_at TEXT,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fiscal_documents (
    id TEXT PRIMARY KEY,
    idempotency_key TEXT NOT NULL UNIQUE,
    order_id TEXT NOT NULL REFERENCES control_sales_orders(id),
    document_type TEXT NOT NULL CHECK (document_type IN ('01', '03')),
    status TEXT NOT NULL DEFAULT 'DRAFT'
        CHECK (status IN ('DRAFT', 'LOCAL_VALIDATION_FAILED', 'LOCALLY_VALIDATED', 'SIGNING', 'SIGNED', 'SENDING', 'ACCEPTED', 'REJECTED', 'CONTINGENCY', 'INVALIDATION_PENDING', 'INVALIDATED')),
    fiscal_date TEXT NOT NULL,
    fiscal_time TEXT NOT NULL,
    customer_snapshot_json TEXT NOT NULL,
    order_snapshot_json TEXT NOT NULL,
    validation_json TEXT NOT NULL DEFAULT '{}',
    subtotal_cents INTEGER NOT NULL DEFAULT 0 CHECK (subtotal_cents >= 0),
    vat_cents INTEGER NOT NULL DEFAULT 0 CHECK (vat_cents >= 0),
    total_cents INTEGER NOT NULL DEFAULT 0 CHECK (total_cents >= 0),
    generation_code TEXT UNIQUE,
    control_number TEXT UNIQUE,
    mh_seal TEXT UNIQUE,
    immutable_at TEXT,
    created_by_user_id TEXT NOT NULL REFERENCES users(id),
    created_by_name TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_fiscal_documents_order ON fiscal_documents(order_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fiscal_documents_status ON fiscal_documents(status, created_at DESC);

CREATE TABLE IF NOT EXISTS fiscal_document_lines (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES fiscal_documents(id) ON DELETE RESTRICT,
    source_detail_id TEXT NOT NULL REFERENCES control_sales_details(id),
    sequence INTEGER NOT NULL,
    description TEXT NOT NULL,
    quantity_millis INTEGER NOT NULL CHECK (quantity_millis > 0),
    unit_price_cents INTEGER NOT NULL CHECK (unit_price_cents >= 0),
    discount_cents INTEGER NOT NULL DEFAULT 0 CHECK (discount_cents >= 0),
    taxable_cents INTEGER NOT NULL DEFAULT 0 CHECK (taxable_cents >= 0),
    exempt_cents INTEGER NOT NULL DEFAULT 0 CHECK (exempt_cents >= 0),
    non_subject_cents INTEGER NOT NULL DEFAULT 0 CHECK (non_subject_cents >= 0),
    vat_cents INTEGER NOT NULL DEFAULT 0 CHECK (vat_cents >= 0),
    total_cents INTEGER NOT NULL CHECK (total_cents >= 0),
    source_snapshot_json TEXT NOT NULL,
    UNIQUE(document_id, source_detail_id)
);

CREATE TABLE IF NOT EXISTS fiscal_transmission_attempts (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES fiscal_documents(id),
    idempotency_key TEXT NOT NULL UNIQUE,
    attempt_number INTEGER NOT NULL CHECK (attempt_number > 0),
    outcome TEXT NOT NULL CHECK (outcome IN ('PENDING', 'ACCEPTED', 'REJECTED', 'UNKNOWN', 'ERROR')),
    http_status INTEGER,
    request_json TEXT NOT NULL DEFAULT '{}',
    response_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL,
    completed_at TEXT
);

CREATE TABLE IF NOT EXISTS fiscal_events (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES fiscal_documents(id),
    event_type TEXT NOT NULL,
    status TEXT NOT NULL,
    payload_json TEXT NOT NULL DEFAULT '{}',
    created_by_user_id TEXT REFERENCES users(id),
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fiscal_files (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES fiscal_documents(id),
    kind TEXT NOT NULL CHECK (kind IN ('UNSIGNED_JSON', 'SIGNED_JSON', 'MH_RESPONSE', 'PDF')),
    relative_path TEXT NOT NULL,
    sha256 TEXT NOT NULL,
    created_at TEXT NOT NULL,
    UNIQUE(document_id, kind)
);

CREATE TABLE IF NOT EXISTS fiscal_audit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document_id TEXT REFERENCES fiscal_documents(id),
    order_id TEXT REFERENCES control_sales_orders(id),
    action TEXT NOT NULL,
    actor_user_id TEXT REFERENCES users(id),
    actor_name TEXT NOT NULL,
    detail_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_fiscal_audit_document ON fiscal_audit(document_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fiscal_audit_order ON fiscal_audit(order_id, created_at DESC);
