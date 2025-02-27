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

  // Add these to your existing authService object
  requestPasswordReset: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/request-password-reset`, {
        email,
      });
      return {
        success: true,
        data: response.data,
        // In development, we're passing the token from the backend for testing
        // In production, this would come via email
        token: response.data.debug_token,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || "Failed to request password reset",
      };
    }
  },

  resetPassword: async (token, password) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, {
        token,
        password,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to reset password",
      };
    }
  },

  // Add this to your existing authService object
  register: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        password,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  },
  // Add these to your existing authService object
  getProfile: async () => {
    try {
      const response = await axios.get(`${API_URL}/profile`);
      return { success: true, data: response.data.profile };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch profile",
      };
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await axios.put(`${API_URL}/profile`, profileData);
      return { success: true, data: response.data.profile };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update profile",
      };
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/change-password`, {
        currentPassword,
        newPassword,
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to change password",
      };
    }
  },
};
