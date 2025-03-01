import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Header from "./Header";
import Footer from "./Footer";

function Dashboard() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h1>Welcome, {user?.username}!</h1>
        <div className="dashboard-content">
          <p>This is your personal dashboard.</p>
          {/* Add dashboard content here */}
        </div>
        <div className="dashboard-links">
          <Link to="/profile" className="dashboard-link">
            View/Edit Profile
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;