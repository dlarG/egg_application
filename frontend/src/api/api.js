import axios from "axios";

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (username, password) =>
    api.post("/auth/login", { username, password }),

  register: (username, password) =>
    api.post("/auth/register", { username, password }),
};

export const userManagementAPI = {
  getUsers: () => api.get("/user-management/users"),
  getUserDetails: (userId) => api.get(`/user-management/users/${userId}`),
  updateUser: (userId, userData) =>
    api.put(`/user-management/users/${userId}`, userData),
  deleteUser: (userId) => api.delete(`/user-management/users/${userId}`),
};

export default api;
