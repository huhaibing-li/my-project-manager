<!-- src/views/auth/RegisterView.vue -->
<template>
  <div class="register-container">
    <el-card class="register-card">
      <div class="register-header">
        <h2>用户注册</h2>
      </div>

      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerRules"
        label-width="100px"
        @submit.prevent
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item label="真实姓名" prop="real_name">
          <el-input v-model="registerForm.real_name" placeholder="请输入真实姓名" />
        </el-form-item>

        <el-form-item label="部门" prop="department">
          <el-input v-model="registerForm.department" placeholder="如：RPA、研发部" />
        </el-form-item>

        <el-form-item label="角色" prop="level">
          <el-select v-model="registerForm.level" placeholder="请选择角色" style="width: 100%">
            <el-option label="普通用户" value="普通用户" />
            <el-option label="管理员" value="管理员" />
            <el-option label="超级管理员" value="超级管理员" />
          </el-select>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button @click="goBack">取消</el-button>
          <el-button type="primary" :loading="loading" @click="handleSubmit">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { register } from '@/api/auth'

const router = useRouter()
const registerFormRef = ref(null)
const loading = ref(false)

const registerForm = ref({
  username: '',
  real_name: '',
  department: '',
  level: '普通用户',
  password: ''
})

const registerRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  real_name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
  department: [{ required: true, message: '请输入部门', trigger: 'blur' }],
  level: [{ required: true, message: '请选择角色', trigger: 'change' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' }
  ]
}

const goBack = () => router.push('/login')

const handleSubmit = async () => {
  await registerFormRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true
    try {
      await register(registerForm.value)
      ElMessage.success('注册成功！请登录')
      router.push('/login')
    } catch (error) {
      console.error('注册失败:', error)
      let msg = '注册失败，请稍后重试'
      if (error.response?.status === 422) {
        msg = '用户名已存在或格式不正确'
      }
      ElMessage.error(msg)
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.register-card {
  width: 500px;
  padding: 30px;
}

.register-header h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
}
</style>