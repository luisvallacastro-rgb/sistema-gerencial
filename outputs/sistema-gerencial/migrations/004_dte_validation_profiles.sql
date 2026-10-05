-- Versioned, auditable local validation profiles.
-- official_schema_embedded remains 0 until the exact MH-distributed schema
-- package is incorporated byte-for-byte. This avoids presenting a local
-- compatibility validator as the official reception service.

CREATE TABLE IF NOT EXISTS billing_validation_profiles (
    document_type TEXT NOT NULL REFERENCES billing_document_types(code),
    schema_version INTEGER NOT NULL CHECK (schema_version > 0),
    profile_name TEXT NOT NULL,
    source_url TEXT NOT NULL,
    official_schema_embedded INTEGER NOT NULL DEFAULT 0
        CHECK (official_schema_embedded IN (0, 1)),
    active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (document_type, schema_version)
);

INSERT OR IGNORE INTO billing_validation_profiles
    (document_type, schema_version, profile_name, source_url,
     official_schema_embedded, active)
VALUES
    ('01', 1, 'Perfil local reforzado Factura v1',
     'https://factura.gob.sv/wp-content/uploads/2021/11/FESVDGIIMH_GuiaIntegracionFacturaElectronicasSV.pdf',
     0, 1),
    ('03', 4, 'Perfil local reforzado CCF v4',
     'https://factura.gob.sv/wp-content/uploads/2021/11/FESVDGIIMH_GuiaIntegracionFacturaElectronicasSV.pdf',
     0, 1);
