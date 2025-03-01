// src/contexts/AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Configure axios to include credentials
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/user`);
        setUser(response.data);
      } catch (error) {
        // User is not authenticated, which is fine for rn
        console.log("User not authenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      setUser(response.data.user); // Ensure this line is setting the user state
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`);
      setUser(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
