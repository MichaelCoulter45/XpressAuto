import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext"; // Replace authService with useAuth
import Header from "./Header";
import Footer from "./Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from auth context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    console.log("Attempting login with:", { username, password });
    
    // Use the login function from AuthContext
    const success = await login(username, password);
    
    if (success) {
      console.log("Login successful, redirecting...");
      navigate("/");
    } else {
      setError("Login failed. Please check your credentials.");
    }
  
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="login-page">
        <div className="login-container">
          <h2>Login to Your Account</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input
                type="email"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="login-button">
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="auth-links">
              Don&apos;t have an account? <a href="/register">Register</a>
            </div>
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
