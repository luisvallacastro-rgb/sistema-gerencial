CREATE TABLE IF NOT EXISTS hr_personnel_actions (
    id TEXT PRIMARY KEY,
    employee_id TEXT NOT NULL REFERENCES hr_employees(id),
    action_type TEXT NOT NULL,
    effective_date TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Registrada' CHECK(status IN ('Registrada','Aplicada','Anulada')),
    previous_department_id TEXT REFERENCES hr_departments(id),
    new_department_id TEXT REFERENCES hr_departments(id),
    previous_position_id TEXT REFERENCES hr_positions(id),
    new_position_id TEXT REFERENCES hr_positions(id),
    previous_salary_cents INTEGER NOT NULL DEFAULT 0,
    new_salary_cents INTEGER NOT NULL DEFAULT 0,
    reason TEXT NOT NULL,
    notes TEXT NOT NULL DEFAULT '',
    applied_at TEXT NOT NULL DEFAULT '',
    applied_by_id TEXT NOT NULL DEFAULT '',
    applied_by_name TEXT NOT NULL DEFAULT '',
    created_by_id TEXT NOT NULL,
    created_by_name TEXT NOT NULL,
    updated_by_id TEXT NOT NULL,
    updated_by_name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_hr_personnel_actions_employee ON hr_personnel_actions(employee_id, effective_date DESC);
CREATE INDEX IF NOT EXISTS idx_hr_personnel_actions_status ON hr_personnel_actions(status, effective_date DESC);
