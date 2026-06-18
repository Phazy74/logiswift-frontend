import axios from 'axios';

const API = axios.create({
  // 1. DYNAMIC URL: Uses environment variable in production, localhost in dev
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// REQUEST INTERCEPTOR (Adds the token to every outgoing request)
API.interceptors.request.use((config) => {
  const authData = localStorage.getItem('logiswift-auth');

  if (authData) {
    try {
      const parsedData = JSON.parse(authData);
      const token = parsedData.state?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Auth Token Parsing Error:", error);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 2. NEW: RESPONSE INTERCEPTOR (Handles errors like expired tokens)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the backend returns 401 (Unauthorized), the token is likely invalid or expired
    if (error.response && error.response.status === 401) {
      console.warn("Session expired or unauthorized. Logging out...");
      
      // Clear local storage and redirect to login
      localStorage.removeItem('logiswift-auth');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;