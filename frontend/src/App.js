import { BrowserRouter, Navigate, Outlet, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles/app-ui.css";
import LeadDetails from "./pages/LeadDetails";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import Leads from "./pages/Leads.js";

function RequireAuth() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/leads/:id" element={<LeadDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;