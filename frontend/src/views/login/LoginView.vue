<!-- src/views/auth/LoginView.vue -->
<template>
  <div class="login-container">
    <el-card class="login-card">
      <div slot="header" class="login-header">
        <h2>项目管理系统</h2>
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="0"
        @submit.prevent
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            prefix-icon="User"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>

        <div class="links">
          <router-link to="/register">没有账号？去注册</router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { login } from '@/api/auth'

const router = useRouter()
const loginFormRef = ref(null)
const loading = ref(false)

const loginForm = ref({
  username: 'admin',
  password: 'admin123'
})

const loginRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = async () => {
  await loginFormRef.value.validate(async (valid) => {
    if (!valid) return

    // loading.value = true
    try {
      // const res = await login(loginForm.value.username, loginForm.value.password)
      // const { access_token } = res.data

      // localStorage.setItem('access_token', access_token)
      ElMessage.success('登录成功！')

      // 👇 新增：立即获取用户信息并存储
      // const userRes = await getCurrentUser()
      // localStorage.setItem('user_info', JSON.stringify(userRes.data)) // 存储完整用户信息
      // 跳转首页（或重定向）
      // const redirect = router.currentRoute.value.query.redirect || '/projects'
      console.log('router',router)
      router.push('/projects')
    } catch (error) {
      console.error('登录失败:', error)
      let msg = '用户名或密码错误'
      if (error.response?.status === 422) {
        msg = '输入格式不正确'
      }
      ElMessage.error(msg)
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.login-card {
  width: 400px;
  padding: 30px;
}

.login-header h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
}

.links {
  text-align: center;
  margin-top: 15px;
}

.links a {
  color: #409eff;
  text-decoration: none;
}
</style>