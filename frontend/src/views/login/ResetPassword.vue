<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">重置密码</h2>
      <el-form @submit.prevent="handleRequest">
        <el-form-item>
          <el-input v-model="email" placeholder="注册邮箱" />
        </el-form-item>
        <el-button type="primary" native-type="submit" style="width:100%">发送重置链接</el-button>
        <div style="margin-top:10px;text-align:center">
          <el-link type="primary" @click="$router.push('/login')">返回登录</el-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleRequest = async () => {
  try {
    await authStore.requestPasswordReset(email.value)
    alert('重置链接已发送（演示模式）')
  } catch (error) {
    alert('请求失败')
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
