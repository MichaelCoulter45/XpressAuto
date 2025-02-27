import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import Header from "./Header";
import Footer from "./Footer";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const result = await authService.getCurrentUser();
      if (result.success) {
        setUser(result.data);
        setLoading(false);
      } else {
        // Redirect to login if not authenticated
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await authService.logout();
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h1>Welcome, {user.username}!</h1>
        <div className="dashboard-content">
          <p>This is your personal dashboard.</p>
          {/* Add your dashboard content here */}
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
