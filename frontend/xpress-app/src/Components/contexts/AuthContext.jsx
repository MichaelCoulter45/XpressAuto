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
  function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, error: contextError } = useAuth(); // Get login and error from context
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      const success = await login(username, password);
  
      if (success) {
        // Redirect to home page after successful login
        navigate("/");
      } else {
        setError(contextError || "Login failed. Please try again.");
      }
  
      setLoading(false);
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
