function LoginScreen({ email, password, onEmailChange, onPasswordChange, onSubmit }) {
  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div className="auth-panel__inner">
          <div className="auth-panel__visual">
            <p className="page-kicker" style={{ color: "rgba(255,255,255,0.72)" }}>
              Assessment CRM
            </p>
            <h1 className="page-title" style={{ color: "#fff" }}>
              Elegant lead tracking with a focused workspace.
            </h1>
            <p className="page-subtitle" style={{ color: "rgba(255,255,255,0.72)" }}>
              Sign in to manage leads, track pipeline movement, and keep notes in one clean dashboard.
            </p>

            <div className="section-grid section-grid--two" style={{ marginTop: "1.5rem" }}>
              <div className="metric">
                <p className="metric__label">Navigation</p>
                <p className="metric__value">Simple</p>
              </div>
              <div className="metric">
                <p className="metric__label">Workflow</p>
                <p className="metric__value">Fast</p>
              </div>
            </div>
          </div>

          <div className="auth-panel__content">
            <p className="page-kicker">Welcome back</p>
            <h2 className="page-title" style={{ fontSize: "1.65rem" }}>
              Login to continue
            </h2>
            <p className="page-subtitle">Use your account details to access the protected pages.</p>

            <div className="form-grid" style={{ marginTop: "1.25rem" }}>
              <div className="field">
                <input placeholder="Email" value={email} onChange={(e) => onEmailChange(e.target.value)} />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" value={password} onChange={(e) => onPasswordChange(e.target.value)} />
              </div>
            </div>

            <div className="actions-row" style={{ marginTop: "1.25rem" }}>
              <button className="btn btn--primary" onClick={onSubmit} type="button">
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginScreen;