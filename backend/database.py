import sqlite3

conn = sqlite3.connect('crm.db', check_same_thread=False)
cursor = conn.cursor()


# create tables
cursor.execute("""
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    company TEXT,
    email TEXT,
    phone TEXT,
    source TEXT,
    assigned_to TEXT,
    status TEXT,
    deal_value REAL,
    created_at TEXT,
    updated_at TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER,
    content TEXT,
    created_by TEXT,
    created_at TEXT
)
""")

conn.commit()