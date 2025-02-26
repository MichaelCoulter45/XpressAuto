// src/components/Navbar.js
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Your App</Link>
      </div>
      <div className="navbar-menu">
        {user ? (
          <>
            <span className="user-welcome">Welcome, {user.username}</span>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
