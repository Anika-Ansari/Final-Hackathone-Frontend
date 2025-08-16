import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };
    if (location.pathname === "/") return null;

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">HijabStore</Link>
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
        <Link to="/reviews" onClick={() => setMenuOpen(false)}>Reviews</Link>
        {user ? (
          <button onClick={handleLogout} className="logout-btn">Log Out</button>
        ) : (
          <>
            <Link to="/" className="login-btn" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/" className="signup-btn" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </>
        )}
      </div>

      {/* Hamburger toggle */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
