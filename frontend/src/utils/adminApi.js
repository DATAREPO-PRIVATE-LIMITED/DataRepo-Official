import { AxiosInstance } from '../routes/axiosInstance';

// Use shared AxiosInstance and prefix admin routes
const adminApi = {
  get: (url, config) => AxiosInstance.get(`/admin${url}`, config),
  post: (url, data, config) => AxiosInstance.post(`/admin${url}`, data, config),
  put: (url, data, config) => AxiosInstance.put(`/admin${url}`, data, config),
  patch: (url, data, config) => AxiosInstance.patch(`/admin${url}`, data, config),
  delete: (url, config) => AxiosInstance.delete(`/admin${url}`, config),
};



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

// Admin: Publish a new API
export const publishApi = (formData) => {
  const payload = {
    name: formData.name,
    category: formData.category,
    description: formData.description,
    baseUrl: formData.baseUrl,
    version: (() => {
      // Backend expects Number; coerce from possible "1.0.0" format
      const numeric = parseFloat(String(formData.version || '1'));
      return Number.isFinite(numeric) ? numeric : 1;
    })(),
    priceModel: formData.pricing === 'free' ? 'Free' : 'Pay Per Use',
    rateLimit: formData.rateLimit ? Number(formData.rateLimit) : undefined,
    tags: Array.isArray(formData.tags) ? formData.tags : [],
    docsUrl: formData.documentation || ''
  };
  return adminApi.post('/add-api', payload);
};