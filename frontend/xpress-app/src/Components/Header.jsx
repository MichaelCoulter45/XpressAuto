import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">Express Auto Care</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          {user ? (
            // Show these links when user is logged in
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-logout-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            // Show these links when user is NOT logged in
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Location</a>
          </li>
        </ul>
      </nav>
      <div className="icons">
        <button>🔍</button> {/* Search Icon */}
        <button>📞</button> {/* Contact Icon */}
        <button>🌍</button> {/* Maps Icon */}
      </div>
    </header>
  );
}

export default Header;