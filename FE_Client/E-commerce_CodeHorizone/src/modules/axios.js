import axios from 'axios';

// Set up Axios instance
const baseURL = 'http://localhost:4000';
const instance = axios.create({ baseURL });

// Add interceptor to automatically add authorization header
instance.interceptors.request.use((config) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzA4NTQwODY4fQ.sSdLM8XGvAIfW0fEydx1pH-Ywf5bHFWgYqP6ZfG0atc";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { instance  };