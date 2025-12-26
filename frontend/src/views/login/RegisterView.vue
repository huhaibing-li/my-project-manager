<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">注册账号</h2>
      <el-form @submit.prevent="handleRegister">
        <el-form-item>
          <el-input v-model="username" placeholder="用户名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" type="password" placeholder="密码" />
        </el-form-item>
        <el-button type="primary" native-type="submit" style="width:100%">注册</el-button>
        <div style="margin-top:10px;text-align:center">
          <el-link type="primary" @click="$router.push('/login')">已有账号？去登录</el-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleRegister = async () => {
  try {
    await authStore.register(username.value, email.value, password.value)
    alert('注册成功，请登录')
    router.push('/login')
  } catch (error) {
    alert('注册失败')
  }
}
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
}
.login-card {
  width: 400px;
}
.title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
