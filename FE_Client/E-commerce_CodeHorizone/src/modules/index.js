import axios from 'axios'
// set up axios instance
const baseURL = 'http://localhost:4000'
const instance = axios.create({ baseURL })

// add interceptor to automatically add authorization header
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
export { instance }
