import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../Services/authService.js";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await authService.requestPasswordReset(email);

    if (result.success) {
      setIsSuccess(true);
      setMessage("Reset instructions have been sent to your email.");

      // In development only - showing token for testing
      if (result.token) {
        setResetToken(result.token);
      }
    } else {
      setIsSuccess(false);
      setMessage(result.error || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="login-page">
        <div className="login-container">
          <h2>Reset Password</h2>

          {!isSuccess ? (
            <>
              <p className="instruction-text">
                Enter your email address and we'll send you instructions to
                reset your password.
              </p>

              {message && (
                <div
                  className={`message ${
                    isSuccess ? "success-message" : "error-message"
                  }`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="login-button"
                >
                  {loading ? "Sending..." : "Reset Password"}
                </button>
              </form>
            </>
          ) : (
            <div className="success-container">
              <div className="success-message">{message}</div>

              {/* Development only - show token for testing */}
              {resetToken && (
                <div className="dev-token">
                  <p>Development token (remove in production):</p>
                  <code>{resetToken}</code>
                  <Link
                    to={`/reset-password/${resetToken}`}
                    className="login-button"
                  >
                    Continue to Reset Password
                  </Link>
                </div>
              )}

              <div className="auth-links">
                <Link to="/login">Back to Login</Link>
              </div>
            </div>
          )}

          <div className="auth-links">
            <Link to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ForgotPassword;
