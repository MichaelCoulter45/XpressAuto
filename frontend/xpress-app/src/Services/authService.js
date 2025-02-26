import axios from "axios";

// Set the base URL to your Flask backend
const API_URL = "http://127.0.0.1:5000/api";

// Configure axios to include credentials (cookies)
axios.defaults.withCredentials = true;

// Authentication service methods
export const authService = {
  // Login function
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  },

  // Logout function
  logout: async () => {
    try {
      await axios.post(`${API_URL}/logout`);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Logout failed",
      };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await axios.get(`${API_URL}/user`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false };
    }
  },
};
