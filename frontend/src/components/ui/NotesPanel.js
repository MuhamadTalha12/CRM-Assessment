function NotesPanel({ content, onContentChange, onSubmit, notes }) {
  return (
    <section className="notes-panel">
      <p className="page-kicker">Lead notes</p>
      <h2 className="page-title" style={{ fontSize: "1.55rem" }}>
        Notes and context
      </h2>
      <p className="page-subtitle">Record call outcomes, follow-ups, and key details for the lead.</p>

      <div className="field" style={{ marginTop: "1rem" }}>
        <textarea placeholder="Write note..." value={content} onChange={(e) => onContentChange(e.target.value)} />
      </div>

      <div className="actions-row" style={{ marginTop: "0.85rem" }}>
        <button className="btn btn--primary" onClick={onSubmit} type="button">
          Add Note
        </button>
      </div>

      <div className="notes-list" style={{ marginTop: "1.25rem" }}>
        {notes.map((note, index) => (
          <div key={index} className="note-card">
            <p>{note[2]}</p>
            <small>
              {note[3] || "admin"} · {note[4]}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NotesPanel;