import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can also clear any localStorage/session here if needed
    navigate("/"); // Redirect to homepage
  };

  return (
    <nav className="admin-navbar">
      <ul>
        <li>
          <NavLink
            to="/admin"
            className={() =>
              location.pathname === "/admin" ? "active" : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/fabrics"
            className={() =>
              location.pathname === "/admin/fabrics" ? "active" : ""
            }
          >
            Manage Fabrics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/orders"
            className={() =>
              location.pathname === "/admin/orders" ? "active" : ""
            }
          >
            Manage Orders
          </NavLink>
        </li>
      </ul>
      <div className="logout-container">
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
