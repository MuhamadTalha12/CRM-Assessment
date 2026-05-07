function PageHeader({ kicker, title, subtitle }) {
  return (
    <section className="hero-panel">
      {kicker ? <p className="page-kicker">{kicker}</p> : null}
      <h1 className="page-title">{title}</h1>
      {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
    </section>
  );
}

export default PageHeader;