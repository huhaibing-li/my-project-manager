<!-- src/components/layout/TheSidebar.vue -->
<template>
  <div class="sidebar">
    <el-menu
      :default-active="$route.path"
      mode="vertical"
      router
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409eff"
      :unique-opened="true"
    >
      <el-menu-item index="/projects">
        <el-icon><Document /></el-icon>
        <span>项目列表</span>
      </el-menu-item>

      <el-menu-item index="/projects/new">
        <el-icon><Plus /></el-icon>
        <span>新建项目</span>
      </el-menu-item>

      <!-- <el-menu-item index="/users" v-if="isAdmin"> -->
      <el-menu-item index="/users">
        <el-icon><User /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Document, Plus, User } from '@element-plus/icons-vue'

const isAdmin = computed(() => {
  const userStr = localStorage.getItem('user_info')
  if (!userStr) return false
  try {
    const user = JSON.parse(userStr)
    return ['超级管理员', '管理员'].includes(user.level)
  } catch (e) {
    return false
  }
})
</script>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #304156;
  height: 100%;
}

:deep(.el-menu) {
  border: none;
}

:deep(.el-menu-item) {
  height: 50px;
  line-height: 50px;
}
</style>