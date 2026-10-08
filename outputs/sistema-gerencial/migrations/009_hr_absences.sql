CREATE TABLE IF NOT EXISTS hr_absences (
    id TEXT PRIMARY KEY,
    employee_id TEXT NOT NULL REFERENCES hr_employees(id),
    absence_type TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    days REAL NOT NULL DEFAULT 0 CHECK(days >= 0),
    status TEXT NOT NULL DEFAULT 'Registrada' CHECK(status IN ('Registrada','Aprobada','Rechazada','Anulada')),
    reference TEXT NOT NULL DEFAULT '',
    notes TEXT NOT NULL DEFAULT '',
    created_by_id TEXT NOT NULL,
    created_by_name TEXT NOT NULL,
    updated_by_id TEXT NOT NULL,
    updated_by_name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_hr_absences_employee ON hr_absences(employee_id, start_date DESC);
CREATE INDEX IF NOT EXISTS idx_hr_absences_status ON hr_absences(status, start_date DESC);
