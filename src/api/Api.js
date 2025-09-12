import axios from 'axios'

// Replace with your backend URL
const BASE_URL = import.meta.env.VITE_API_BASE

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
})

// Add JWT token automatically if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') // store token on login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance
