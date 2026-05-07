# CRM Assessment

## Overview

A small CRM Lead Management System — FastAPI backend, React frontend. You can create and manage leads, attach notes to them, and see a dashboard with counts and deal totals.

## Tech stack

- Backend: Python, FastAPI, sqlite3
- Server: uvicorn
- Frontend: React, axios, react-router-dom
- Styling: plain CSS

## Features

- Token-based demo login
- Protected routes for leads and dashboard
- Full CRUD on leads
- Notes per lead
- Dashboard with lead counts and deal value sums

## Running locally

You'll need Python 3.8+ and Node with npm or yarn.

**Backend**

```bash
cd backend
python -m venv .venv

# Windows PowerShell
.\.venv\Scripts\Activate.ps1
# Windows CMD
.\.venv\Scripts\activate.bat

pip install fastapi uvicorn
uvicorn main:app 
# uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

**Frontend**

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:3000`.

## Environment variables

None required. The demo auth token is hardcoded in `backend/main.py` as `AUTH_TOKEN`.

## Test credentials

- Email: `admin@example.com`
- Password: `password123`

On a successful login the backend returns a token; the frontend stores it in `localStorage (SQLite)` and redirects to `/dashboard`.

## Database

SQLite. The file `backend/crm.db` is created on first run; `backend/database.py` initializes the tables automatically.

To reset:

```bash
rm backend/crm.db        # macOS/Linux
del backend\\crm.db      # Windows
```

Then restart the backend.

## Known limitations

- Credentials and token are hardcoded — demo only.
- No password hashing or user management.
- Minimal validation and error handling.
- Not set up for production deployment.

## Reflection

I kept scope tight. FastAPI was a natural fit — async support, quick to write, and the auto-generated docs make the API easy to inspect. React for the frontend because it's what I know.

The things I'd fix before this went anywhere near production: proper password hashing, real user accounts, a test suite, and a CI setup. None of that felt in scope for a demo, but it's not a design decision I'd carry forward.

## Demo video

`<https://drive.google.com/file/d/1w0FGoekuVp7kCdU4kO389P3LYA21F5KU/view?usp=drive_link>`

## Files worth reading

- `backend/main.py`
- `backend/database.py`
- `frontend/src/pages/Login.js`

---

Two improvements worth making when there's time:

- `backend/main.py` — return HTTP 401 on bad login, support additional test users
- `frontend/src/pages/Login.js` — show backend error messages, replace the current navigation with `useNavigate()`