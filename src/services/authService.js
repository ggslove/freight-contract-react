import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authService = {
  // 登录
  async login(username, password) {
    try {
      const token = btoa(`${username}:${password}`);
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {}, {
        headers: {
          'Authorization': `Basic ${token}`
        }
      });
      
      // 存储认证信息
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      
      return { success: true, user: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || '登录失败' };
    }
  },

  // 登出
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  },

  // 获取当前用户
  getCurrentUser() {
    return localStorage.getItem('username');
  },

  // 获取认证token
  getAuthToken() {
    return localStorage.getItem('token');
  },

  // 检查是否已登录
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // 设置axios默认认证头
  setAuthHeader() {
    const token = this.getAuthToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Basic ${token}`;
    }
  }
};

// 设置默认认证头
authService.setAuthHeader();

export default authService;