# Database Setup Instructions

The project uses SQLite and initializes the schema automatically when the backend starts.

## Database Location

- The database file is `backend/crm.db`.
- The tables are created from `backend/database.py` on startup.

## First Run

1. Start the backend from the `backend/` directory.
2. The database file will be created automatically if it does not exist.

## Resetting the Database

If you want a clean database, delete `backend/crm.db` and restart the backend.

```bash
# Windows Command Prompt
del backend\crm.db

# Windows PowerShell
Remove-Item backend\crm.db
```

## Important

- Run the backend from the `backend/` folder so the SQLite file is created in the expected location.