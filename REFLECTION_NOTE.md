# Reflection Note

This project stayed intentionally small so the core CRM flow could be delivered quickly: log in, manage leads, store notes, and surface simple dashboard metrics.

FastAPI fit the backend well because it made the API straightforward to implement and easy to inspect during development. React worked well on the frontend because it let the UI stay component-based without adding much setup overhead.

If this were going beyond a demo, the next steps would be real authentication, password hashing, role-based access, validation, and automated tests.