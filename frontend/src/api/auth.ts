import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getCaptcha = () => api.post('/captcha')
export const login = (data: any) => api.post('/login', data)
export const register = (data: any) => api.post('/register', data)
export const requestPasswordReset = (data: any) => api.post('/password-reset/request', data)
