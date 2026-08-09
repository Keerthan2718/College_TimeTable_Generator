import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Attach access token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle expired/invalid authentication
api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.includes("/auth/login")) {

      // Remove expired authentication data
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      // Store message for login page
      sessionStorage.setItem(
        "auth_message",
        "Your session has expired. Please sign in again."
      );

      // Redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;