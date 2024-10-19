// src/api/axiosConfig.ts
import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943/icp'; // Environment variable

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add header bearer token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// error handling for failed api call
axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.error('API call error', error);
  return Promise.reject(error);
});

export default axiosInstance;
