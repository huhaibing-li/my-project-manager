import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    username: ''
  }),
  actions: {
    async login(username: string, password: string, captchaId: string, captcha: string) {
      // ✅ 关键修复 1：用户名添加 trim()
      const sanitizedUsername = username.trim();
      // ✅ 关键修复 2：密码和验证码标准化
      const sanitizedPassword = password.trim();
      const sanitizedCaptcha = captcha.trim().toUpperCase();

      const formData = new FormData();
      formData.append('username', sanitizedUsername);
      formData.append('password', sanitizedPassword);
      formData.append('captcha_id', captchaId);
      formData.append('captcha', sanitizedCaptcha);

      const res = await axios.post('http://localhost:8000/api/login', formData);
      this.token = res.data.access_token;
      localStorage.setItem('token', this.token);
    },
    async register(username: string, email: string, password: string) {
      // ✅ 同样对注册的用户名添加 trim()
      const sanitizedUsername = username.trim();
      const sanitizedPassword = password.trim();
      await axios.post('http://localhost:8000/api/register', { 
        username: sanitizedUsername, 
        email, 
        password: sanitizedPassword 
      })
    },
    async requestPasswordReset(email: string) {
      await axios.post('http://localhost:8000/api/password-reset/request', { email })
    },
    logout() {
      this.token = ''
      localStorage.removeItem('token')
    }
  }
})