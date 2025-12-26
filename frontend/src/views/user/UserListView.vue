<template>
  <div>
    <h2>用户管理</h2>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="role" label="角色" />
      <el-table-column prop="is_active" label="状态" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/users')
    users.value = res.data
  } catch (error) {
    alert('获取用户列表失败')
  }
})
</script>
