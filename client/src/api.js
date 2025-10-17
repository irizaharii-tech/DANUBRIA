import axios from "axios";

// Base URL from your .env file (VITE_API_BASE_URL)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://danubria-hgv-server.onrender.com",
});

// Optional: log requests for debugging
api.interceptors.request.use((config) => {
  console.log("🚚 API Request:", config.url, config.method);
  return config;
});

export default api;
