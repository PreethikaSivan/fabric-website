import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ showSearch, isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();  // clear auth/session
    navigate("/");             // redirect to home page
  };

  return (
    <nav className="main-navbar">
      <div className="nav-logo">Kesavan Exports</div>

      {showSearch && (
        <div className="nav-search">
          <input type="text" placeholder="Search" className="nav-search-input" />
          <button className="nav-search-btn"><FaSearch /></button>
        </div>
      )}

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/fabric/trending">Fabric Collections</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/profile">Profile</Link></li>

        {isLoggedIn && (
          <li>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
