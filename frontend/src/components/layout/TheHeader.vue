<!-- src/components/layout/TheHeader.vue -->
<template>
  <div class="header">
    <div class="logo">项目管理系统</div>
    <div class="user-actions">
      <el-dropdown @command="handleCommand">
        <span class="user-info">
          {{ userInfo?.real_name || userInfo?.username || '用户' }}
          <el-icon style="margin-left: 6px"><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()
const userInfo = ref(null)

onMounted(() => {
  const userStr = localStorage.getItem('user_info')
  if (userStr) {
    try {
      userInfo.value = JSON.parse(userStr)
    } catch (e) {
      console.warn('用户信息解析失败')
    }
  }
})

const handleCommand = (command) => {
  if (command === 'logout') {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_info')
    ElMessage.success('已退出登录')
    router.push('/login')
  }
}
</script>

<style scoped>
.header {
  height: 60px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #eee;
}

.logo {
  font-size: 18px;
  font-weight: bold;
  color: #1989fa;
}

.user-info {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #606266;
}
</style>