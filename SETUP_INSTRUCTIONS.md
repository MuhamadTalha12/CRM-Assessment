# Setup Instructions

## Requirements

- Python 3.8 or newer
- Node.js and npm

## Backend

1. Open a terminal in the repository root.
2. Change into the backend folder.
3. Create and activate a virtual environment.
4. Install the backend dependency.
5. Start the FastAPI server.

```bash
cd backend
python -m venv .venv

# PowerShell
.\.venv\Scripts\Activate.ps1

# Command Prompt
.\.venv\Scripts\activate.bat

pip install fastapi uvicorn
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

## Frontend

1. Open a second terminal.
2. Change into the frontend folder.
3. Install dependencies.
4. Start the React app.

```bash
cd frontend
npm install
npm start
```

## Open the App

Open `http://localhost:3000` in the browser.

## Notes

- The frontend talks to the backend at `http://127.0.0.1:8000`.
- No environment variables are required for the demo build.