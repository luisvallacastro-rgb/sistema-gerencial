-- Local/test integration harness. It records dry runs separately from real
-- transmission attempts, so a simulation can never be mistaken for a DTE
-- accepted by Ministerio de Hacienda.

CREATE TABLE IF NOT EXISTS billing_test_runs (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES billing_documents(id) ON DELETE RESTRICT,
    idempotency_key TEXT NOT NULL UNIQUE,
    test_type TEXT NOT NULL CHECK (test_type IN ('LOCAL_FLOW')),
    outcome TEXT NOT NULL CHECK (outcome IN ('PASSED', 'FAILED')),
    payload_sha256 TEXT NOT NULL,
    result_json TEXT NOT NULL DEFAULT '{}',
    created_by_id TEXT NOT NULL DEFAULT '',
    created_by_name TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_billing_test_runs_document
    ON billing_test_runs(document_id, created_at DESC);
