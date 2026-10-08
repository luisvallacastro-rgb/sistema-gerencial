CREATE TABLE IF NOT EXISTS hr_departments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hr_positions (
    id TEXT PRIMARY KEY,
    department_id TEXT REFERENCES hr_departments(id),
    name TEXT NOT NULL,
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(department_id, name)
);

CREATE TABLE IF NOT EXISTS hr_employees (
    id TEXT PRIMARY KEY,
    employee_number TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    department_id TEXT REFERENCES hr_departments(id),
    position_id TEXT REFERENCES hr_positions(id),
    status TEXT NOT NULL DEFAULT 'Activo' CHECK(status IN ('Activo','Inactivo')),
    hire_date TEXT NOT NULL DEFAULT '',
    birth_date TEXT NOT NULL DEFAULT '',
    personal_id TEXT NOT NULL DEFAULT '',
    tax_id TEXT NOT NULL DEFAULT '',
    social_security_number TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    phone TEXT NOT NULL DEFAULT '',
    address TEXT NOT NULL DEFAULT '',
    salary_cents INTEGER NOT NULL DEFAULT 0 CHECK(salary_cents >= 0),
    notes TEXT NOT NULL DEFAULT '',
    created_by_id TEXT NOT NULL DEFAULT '',
    created_by_name TEXT NOT NULL DEFAULT '',
    updated_by_id TEXT NOT NULL DEFAULT '',
    updated_by_name TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_hr_employees_name ON hr_employees(full_name);
CREATE INDEX IF NOT EXISTS idx_hr_employees_status ON hr_employees(status, employee_number);

CREATE TABLE IF NOT EXISTS hr_audit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    action TEXT NOT NULL,
    actor_user_id TEXT NOT NULL,
    actor_user_name TEXT NOT NULL,
    before_json TEXT NOT NULL DEFAULT '{}',
    after_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_hr_audit_entity ON hr_audit(entity_type, entity_id, id DESC);
CREATE INDEX IF NOT EXISTS idx_hr_audit_created ON hr_audit(id DESC);
