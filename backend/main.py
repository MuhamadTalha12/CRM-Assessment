from datetime import datetime

from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from database import conn, cursor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AUTH_TOKEN = "token123"


def require_auth(authorization: str = Header(default="")):
    if authorization != f"Bearer {AUTH_TOKEN}":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    return True


@app.get("/")
async def home():
    return {"message": "CRM Backend running"}


@app.post("/login")
async def login(email: str, password: str):
    if email == "admin@example.com" and password == "password123":
        return {"token": AUTH_TOKEN}
    return {"error": "Invalid credentials"}


@app.post("/leads")
def create_lead(
    name: str,
    company: str,
    email: str = "",
    phone: str = "",
    source: str = "",
    assigned_to: str = "",
    deal_value: float = 0,
    _: bool = Depends(require_auth),
):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute(
        """
        INSERT INTO leads
        (name, company, email, phone, source, assigned_to, status, deal_value, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            name,
            company,
            email,
            phone,
            source,
            assigned_to,
            "New",
            deal_value,
            now,
            now,
        ),
    )

    conn.commit()
    return {"message": "Lead created"}


@app.get("/leads")
def get_leads(_: bool = Depends(require_auth)):
    cursor.execute("SELECT * FROM leads")
    rows = cursor.fetchall()
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in rows]


@app.put("/leads/{lead_id}")
def update_lead(lead_id: int, status: str, _: bool = Depends(require_auth)):
    now = datetime.now().isoformat()
    cursor.execute(
        """
        UPDATE leads
        SET status = ?, updated_at = ?
        WHERE id = ?
        """,
        (status, now, lead_id),
    )
    conn.commit()
    return {"message": "Lead updation operation successful"}


@app.delete("/leads/{lead_id}")
def delete_lead(lead_id: int, _: bool = Depends(require_auth)):
    cursor.execute("DELETE FROM leads WHERE id = ?", (lead_id,))
    conn.commit()
    return {"message": "Lead deletion operation successful"}


@app.post("/leads/{lead_id}/notes")
def add_note(lead_id: int, content: str, _: bool = Depends(require_auth)):
    now = datetime.now().isoformat()
    cursor.execute(
        """
        INSERT INTO notes (lead_id, content, created_by, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (lead_id, content, "admin", now),
    )
    conn.commit()
    return {"message": "Note addition operation successful"}


@app.get("/leads/{lead_id}/notes")
def get_notes(lead_id: int, _: bool = Depends(require_auth)):
    cursor.execute("SELECT * FROM notes WHERE lead_id=?", (lead_id,))
    return cursor.fetchall()


@app.put("/leads/edit/{lead_id}")
def edit_lead(
    lead_id: int,
    name: str,
    company: str,
    email: str,
    phone: str,
    source: str,
    assigned_to: str,
    deal_value: float,
    _: bool = Depends(require_auth),
):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute(
        """
        UPDATE leads
        SET name=?, company=?, email=?, phone=?, source=?, assigned_to=?, deal_value=?, updated_at=?
        WHERE id=?
        """,
        (
            name,
            company,
            email,
            phone,
            source,
            assigned_to,
            deal_value,
            now,
            lead_id,
        ),
    )

    conn.commit()
    return {"message": "Lead updated"}


@app.get("/dashboard")
def dashboard(_: bool = Depends(require_auth)):
    cursor.execute("SELECT COUNT(*) FROM leads")
    total = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM leads WHERE status='New'")
    new = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM leads WHERE status='Qualified'")
    qualified = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM leads WHERE status='Won'")
    won = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM leads WHERE status='Lost'")
    lost = cursor.fetchone()[0]

    cursor.execute("SELECT SUM(deal_value) FROM leads")
    total_estimated_deal_value = cursor.fetchone()[0] or 0

    cursor.execute("SELECT SUM(deal_value) FROM leads WHERE status='Won'")
    total_won_value = cursor.fetchone()[0] or 0

    return {
        "total_leads": total,
        "new_leads": new,
        "qualified_leads": qualified,
        "won_leads": won,
        "lost_leads": lost,
        "total_estimated_deal_value": total_estimated_deal_value,
        "total_won_value": total_won_value,
    }