import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { authService } from "../Services/authService.js";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsSuccess(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setIsSuccess(false);
      return;
    }

    setLoading(true);

    const result = await authService.resetPassword(token, password);

    if (result.success) {
      setIsSuccess(true);
      setMessage("Your password has been reset successfully.");
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      setIsSuccess(false);
      setMessage(result.error || "Failed to reset password. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="login-page">
        <div className="login-container">
          <h2>Set New Password</h2>

          {message && (
            <div
              className={`message ${
                isSuccess ? "success-message" : "error-message"
              }`}
            >
              {message}
            </div>
          )}

          {!isSuccess ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="login-button">
                {loading ? "Resetting..." : "Set New Password"}
              </button>
            </form>
          ) : (
            <div className="auth-links">
              <p>Redirecting to login page...</p>
              <Link to="/login">Login Now</Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ResetPassword;
