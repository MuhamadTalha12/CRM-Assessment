import { NavLink } from "react-router-dom";
import "../styles/app-ui.css";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="app-navbar">
      <div className="app-navbar__brand">Assessment CRM</div>
      <nav className="app-navbar__links">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "app-navbar__link app-navbar__link--active" : "app-navbar__link")}>
          Dashboard
        </NavLink>
        <NavLink to="/leads" className={({ isActive }) => (isActive ? "app-navbar__link app-navbar__link--active" : "app-navbar__link")}>
          Leads
        </NavLink>
        <button type="button" className="app-navbar__logout" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Navbar;