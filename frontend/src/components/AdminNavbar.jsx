import { NavLink, useLocation } from "react-router-dom";
import "./AdminNavbar.css";

function AdminNavbar() {
  const location = useLocation();

  return (
    <nav className="admin-navbar">
      <ul>
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              location.pathname === "/admin" ? "active" : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/fabrics"
            className={({ isActive }) =>
              location.pathname === "/admin/fabrics" ? "active" : ""
            }
          >
            Manage Fabrics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              location.pathname === "/admin/orders" ? "active" : ""
            }
          >
            Manage Orders
          </NavLink>
        </li>
      </ul>
      <div className="logout-container">
        <button onClick={() => (window.location.href = "http://localhost:5173")}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
