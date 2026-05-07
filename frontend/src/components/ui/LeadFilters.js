function LeadFilters({
  search,
  statusFilter,
  sourceFilter,
  assignedFilter,
  onSearch,
  onStatusChange,
  onSourceChange,
  onAssignedChange
}) {
  return (
    <section className="content-panel toolbar">
      <div className="field">
        <input placeholder="Search by name, company, or email" value={search} onChange={(e) => onSearch(e.target.value)} />
      </div>

      <div className="field">
        <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="">All Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Proposal Sent</option>
          <option>Won</option>
          <option>Lost</option>
        </select>
      </div>

      <div className="field">
        <select value={sourceFilter} onChange={(e) => onSourceChange(e.target.value)}>
          <option value="">All Sources</option>
          <option>Website</option>
          <option>LinkedIn</option>
          <option>Referral</option>
          <option>Email</option>
          <option>Event</option>
        </select>
      </div>

      <div className="field">
        <input
          placeholder="Assigned salesperson"
          value={assignedFilter}
          onChange={(e) => onAssignedChange(e.target.value)}
        />
      </div>
    </section>
  );
}

export default LeadFilters;