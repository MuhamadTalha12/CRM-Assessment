function LeadCard({ lead, onOpen, onStatusChange, onDelete, onEdit, editing, editData, onEditChange, onSave }) {
  return (
    <article className="lead-card">
      <div className="lead-card__header">
        <div>
          <h3 className="lead-card__title" onClick={() => onOpen(lead.id)}>
            {lead.name}
          </h3>
          <p className="lead-card__meta">
            {lead.company}
            <br />
            {lead.email}
            <br />
            Assigned: {lead.assigned_to || "Unassigned"}
            <br />
            Deal Value: {lead.deal_value ?? 0}
            <br />
            Created: {lead.created_at || "-"}
            <br />
            Updated: {lead.updated_at || "-"}
          </p>
        </div>

        <span className="lead-chip">{lead.status || "New"}</span>
      </div>

      <div className="lead-card__footer">
        <div className="actions-row">
          <select className="compact-select" value={lead.status} onChange={(e) => onStatusChange(lead.id, e.target.value)}>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Proposal Sent</option>
            <option>Won</option>
            <option>Lost</option>
          </select>
          <button className="btn btn--soft" onClick={() => onEdit(lead)} type="button">
            Edit
          </button>
          <button className="btn btn--danger" onClick={() => onDelete(lead.id)} type="button">
            Delete
          </button>
        </div>

        {editing ? (
          <div className="form-grid form-grid--two">
            <div className="field">
              <input value={editData.name || ""} onChange={(e) => onEditChange("name", e.target.value)} />
            </div>
            <div className="field">
              <input value={editData.company || ""} onChange={(e) => onEditChange("company", e.target.value)} />
            </div>
            <div className="field">
              <input value={editData.email || ""} onChange={(e) => onEditChange("email", e.target.value)} />
            </div>
            <div className="field">
              <input value={editData.phone || ""} onChange={(e) => onEditChange("phone", e.target.value)} />
            </div>
            <div className="field">
              <input value={editData.source || ""} onChange={(e) => onEditChange("source", e.target.value)} />
            </div>
            <div className="field">
              <input value={editData.assigned_to || ""} onChange={(e) => onEditChange("assigned_to", e.target.value)} />
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <input value={editData.deal_value || ""} onChange={(e) => onEditChange("deal_value", e.target.value)} />
            </div>
            <div className="actions-row" style={{ gridColumn: "1 / -1" }}>
              <button className="btn btn--primary" onClick={onSave} type="button">
                Save Changes
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default LeadCard;