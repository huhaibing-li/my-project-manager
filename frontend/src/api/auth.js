// src/api/auth.js
import request from '@/utils/request'

// 注册
export const register = (data) => {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}

// 登录（注意：form 格式）
export const login = (username, password) => {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)
  // grant_type 等可按需添加
  return request({
    url: '/auth/token',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: new URLSearchParams({
      username,
      password,
      grant_type: 'password'
    })
  })
}

// 获取当前用户
export const getCurrentUser = () => {
  return request({
    url: '/auth/me',
    method: 'get'
  })
}