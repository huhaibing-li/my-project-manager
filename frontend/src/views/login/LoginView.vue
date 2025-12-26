<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">项目管理系统</h2>
      <el-form @submit.prevent="handleLogin">
        <el-form-item>
          <el-input v-model="username" placeholder="用户名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" type="password" placeholder="密码" />
        </el-form-item>
        <el-form-item label="验证码">
          <div style="display:flex;gap:10px;align-items:center">
            <el-input v-model="captchaInput" placeholder="请输入验证码" style="width:120px" />
            <img :src="'data:image/png;base64,' + captchaImage" @click="loadCaptcha" style="cursor:pointer" />
          </div>
        </el-form-item>
        <el-button type="primary" native-type="submit" style="width:100%">登录</el-button>
        <div style="margin-top:10px;text-align:center">
          <el-link type="primary" @click="$router.push('/register')">注册账号</el-link> |
          <el-link type="primary" @click="$router.push('/reset-password')">忘记密码</el-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getCaptcha } from '@/api/auth'

// ✅ 关键修复：移除硬编码初始值！
const username = ref('')  // ✅ 保持为空
const password = ref('')  // ✅ 保持为空
const captchaInput = ref('')
const captchaImage = ref('')
const captchaId = ref('')
const router = useRouter()
const authStore = useAuthStore()

const loadCaptcha = async () => {
  const res = await getCaptcha()
  captchaImage.value = res.data.image
  captchaId.value = res.data.captcha_id
}

onMounted(() => {
  loadCaptcha()
})

const handleLogin = async () => {
  try {
    // ✅ 用户输入的值会正确发送
    await authStore.login(username.value, password.value, captchaId.value, captchaInput.value)
    router.push('/projects')
  } catch (error) {
    alert('登录失败')
    loadCaptcha()
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