function LeadForm({
  values,
  onChange,
  onSubmit,
  submitLabel = "Add Lead",
  title = "Create a lead",
  subtitle = "Capture fresh opportunities with the core deal details.",
  isEdit = false,
  errors = {}
}) {
  const handleNumericChange = (field, nextValue) => {
    onChange(field, nextValue.replace(/\D/g, ""));
  };

  return (
    <section className="form-card card-section">
      <p className="page-kicker">{isEdit ? "Edit lead" : "New lead"}</p>
      <h2 className="page-title" style={{ fontSize: "1.4rem" }}>
        {title}
      </h2>
      <p className="page-subtitle">{subtitle}</p>

      <div className="form-grid form-grid--two" style={{ marginTop: "1rem" }}>
        <div className="field">
          <input placeholder="Name" value={values.name} onChange={(e) => onChange("name", e.target.value)} />
        </div>
        <div className="field">
          <input placeholder="Company" value={values.company} onChange={(e) => onChange("company", e.target.value)} />
        </div>
        <div className="field">
          <input placeholder="Email" value={values.email} onChange={(e) => onChange("email", e.target.value)} />
        </div>
        <div className="field">
          <input
            placeholder="Phone"
            value={values.phone}
            onChange={(e) => handleNumericChange("phone", e.target.value)}
            inputMode="numeric"
            pattern="[0-9]*"
          />
          {errors.phone ? <small className="field-error">{errors.phone}</small> : null}
        </div>
        <div className="field">
          <input placeholder="Source" value={values.source} onChange={(e) => onChange("source", e.target.value)} />
        </div>
        <div className="field">
          <input placeholder="Assigned To" value={values.assigned} onChange={(e) => onChange("assigned", e.target.value)} />
        </div>
        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <input
            placeholder="Deal Value"
            value={values.value}
            onChange={(e) => handleNumericChange("value", e.target.value)}
            inputMode="numeric"
            pattern="[0-9]*"
          />
          {errors.value ? <small className="field-error">{errors.value}</small> : null}
        </div>
      </div>

      <div className="actions-row" style={{ marginTop: "1rem" }}>
        <button className="btn btn--primary" onClick={onSubmit} type="button">
          {submitLabel}
        </button>
      </div>
    </section>
  );
}

export default LeadForm;