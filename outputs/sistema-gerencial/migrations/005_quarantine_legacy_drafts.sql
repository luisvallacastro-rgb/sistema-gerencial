-- Preserve legacy local snapshots, but never present an empty/pre-generator
-- payload as a valid DTE draft. Failed local validations must not block a
-- corrected replacement; accepted/signed/sending documents remain protected.

UPDATE billing_documents
SET status = 'LOCAL_VALIDATION_FAILED',
    validation_json = '{"valid":false,"errors":["Borrador local anterior al generador DTE actual; debe prepararse nuevamente"]}',
    updated_at = CURRENT_TIMESTAMP
WHERE status = 'DRAFT'
  AND (unsigned_payload_json = '{}' OR json_extract(unsigned_payload_json, '$.identificacion') IS NULL);

DROP INDEX IF EXISTS uq_billing_active_source;

CREATE UNIQUE INDEX uq_billing_active_source
    ON billing_documents(source_type, source_id)
    WHERE status NOT IN ('REJECTED', 'INVALIDATED', 'LOCAL_VALIDATION_FAILED');
