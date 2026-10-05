UPDATE billing_document_types SET schema_version = 4 WHERE code = '03';

CREATE TABLE IF NOT EXISTS billing_control_sequences (
    environment TEXT NOT NULL CHECK (environment IN ('development', 'test', 'production')),
    document_type TEXT NOT NULL REFERENCES billing_document_types(code),
    establishment_code TEXT NOT NULL,
    point_of_sale_code TEXT NOT NULL,
    next_number INTEGER NOT NULL DEFAULT 1 CHECK (next_number > 0),
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (environment, document_type, establishment_code, point_of_sale_code)
);

CREATE TABLE IF NOT EXISTS billing_schema_validations (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES billing_documents(id) ON DELETE RESTRICT,
    document_type TEXT NOT NULL,
    schema_version INTEGER NOT NULL,
    valid INTEGER NOT NULL CHECK (valid IN (0, 1)),
    errors_json TEXT NOT NULL DEFAULT '[]',
    payload_sha256 TEXT NOT NULL,
    validated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_billing_schema_validations_document
    ON billing_schema_validations(document_id, validated_at DESC);
