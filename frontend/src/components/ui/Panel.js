function Panel({ children, className = "" }) {
  return <div className={`dashboard-panel ${className}`.trim()}>{children}</div>;
}

export default Panel;