import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../Services/authService";
import Header from "./Header";
import Footer from "./Footer";

function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // Fetch profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const result = await authService.getProfile();

      if (result.success) {
        setProfile(result.data);
        setLoading(false);
      } else {
        // If failed to fetch profile, user might not be authenticated
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle profile form input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle password form input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const result = await authService.updateProfile(profile);

    if (result.success) {
      setIsSuccess(true);
      setMessage("Profile updated successfully");
      setProfile(result.data);
    } else {
      setIsSuccess(false);
      setMessage(result.error || "Failed to update profile");
    }
  };

  // Handle password change form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setIsSuccess(false);
      setMessage("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setIsSuccess(false);
      setMessage("New password must be at least 6 characters long");
      return;
    }

    const result = await authService.changePassword(
      passwordData.currentPassword,
      passwordData.newPassword
    );

    if (result.success) {
      setIsSuccess(true);
      setMessage("Password changed successfully");
      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      setIsSuccess(false);
      setMessage(result.error || "Failed to change password");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="profile-container">
        <h1>My Profile</h1>

        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Profile Details
          </button>
          <button
            className={`tab-button ${activeTab === "password" ? "active" : ""}`}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </button>
        </div>

        {message && (
          <div
            className={`message ${
              isSuccess ? "success-message" : "error-message"
            }`}
          >
            {message}
          </div>
        )}

        {/* Profile Details Tab */}
        {activeTab === "details" && (
          <div className="tab-content">
            <form onSubmit={handleProfileSubmit}>
              <div className="form-group">
                <label htmlFor="username">Email (Username)</label>
                <input
                  type="email"
                  id="username"
                  name="username"
                  value={profile.username || ""}
                  disabled
                  className="disabled-input"
                />
                <small>Email cannot be changed</small>
              </div>

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name || ""}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone || ""}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={profile.address || ""}
                  onChange={handleProfileChange}
                  rows="3"
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Update Profile
              </button>
            </form>
          </div>
        )}

        {/* Change Password Tab */}
        {activeTab === "password" && (
          <div className="tab-content">
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <button type="submit" className="submit-button">
                Change Password
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Profile;
