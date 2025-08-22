import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000/api';

// Create axios instance with default config
const adminApi = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
adminApi.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
adminApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/signin';
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Dashboard and Statistics
export const getDashboardStats = () => {
  return adminApi.get('/dashboard/stats');
};

export const getAnalyticsData = (period = 'month') => {
  return adminApi.get(`/analytics?period=${period}`);
};

// User Management
export const getAllUsers = (params = {}) => {
  return adminApi.get('/users', { params });
};

export const getUserById = (userId) => {
  return adminApi.get(`/users/${userId}`);
};

export const createUser = (userData) => {
  return adminApi.post('/users', userData);
};

export const updateUser = (userId, userData) => {
  return adminApi.put(`/users/${userId}`, userData);
};

export const updateUserStatus = (userId, status) => {
  return adminApi.patch(`/users/${userId}/status`, { status });
};

export const deleteUser = (userId) => {
  return adminApi.delete(`/users/${userId}`);
};

// Services Monitoring
export const getServicesStatus = () => {
  return adminApi.get('/services/status');
};

// Billing Management
export const getBillingData = (params = {}) => {
  return adminApi.get('/billing', { params });
};

export default adminApi;
