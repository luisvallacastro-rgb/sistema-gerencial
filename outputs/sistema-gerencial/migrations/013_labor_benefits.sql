CREATE TABLE IF NOT EXISTS labor_benefit_records (
    id TEXT PRIMARY KEY,
    employee_id TEXT REFERENCES hr_employees(id),
    employee_number TEXT NOT NULL UNIQUE,
    correlative INTEGER NOT NULL,
    full_name TEXT NOT NULL,
    employment_status INTEGER NOT NULL CHECK(employment_status IN (1, 2)),
    position_name TEXT NOT NULL DEFAULT '',
    hire_date TEXT NOT NULL,
    reported_tenure TEXT,
    monthly_salary_cents INTEGER CHECK(monthly_salary_cents IS NULL OR monthly_salary_cents > 0),
    reported_days_year INTEGER,
    reported_days INTEGER CHECK(reported_days IS NULL OR reported_days >= 0),
    bonus_cents INTEGER CHECK(bonus_cents IS NULL OR bonus_cents >= 0),
    vacation_cents INTEGER CHECK(vacation_cents IS NULL OR vacation_cents >= 0),
    severance_cents INTEGER CHECK(severance_cents IS NULL OR severance_cents >= 0),
    prior_payments_cents INTEGER NOT NULL DEFAULT 0 CHECK(prior_payments_cents >= 0),
    deductions_cents INTEGER NOT NULL DEFAULT 0 CHECK(deductions_cents >= 0),
    net_total_cents INTEGER CHECK(net_total_cents IS NULL OR net_total_cents >= 0),
    receipt_status TEXT NOT NULL DEFAULT 'Pendiente' CHECK(receipt_status IN ('Pendiente','Registrada')),
    receipt_date TEXT NOT NULL DEFAULT '',
    calculation_status TEXT NOT NULL DEFAULT 'Borrador' CHECK(calculation_status IN ('Borrador','Calculado','En revisión','Observado','Aprobado','Anulado')),
    notes TEXT NOT NULL DEFAULT '',
    revision INTEGER NOT NULL DEFAULT 1,
    updated_by TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_labor_benefits_name ON labor_benefit_records(full_name);
CREATE INDEX IF NOT EXISTS idx_labor_benefits_status ON labor_benefit_records(employment_status, employee_number);

CREATE TABLE IF NOT EXISTS labor_benefit_audit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    record_id TEXT NOT NULL REFERENCES labor_benefit_records(id),
    action TEXT NOT NULL,
    actor_user_id TEXT NOT NULL,
    actor_user_name TEXT NOT NULL,
    before_json TEXT NOT NULL DEFAULT '{}',
    after_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_labor_benefit_audit_record ON labor_benefit_audit(record_id, id DESC);
