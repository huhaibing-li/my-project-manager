<template>
  <div>
    <h2>用户管理</h2>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="department" label="部门" />
      <el-table-column prop="level" label="级别" />
      <el-table-column prop="is_active" label="状态" />
    </el-table>
    <el-button type="primary">新增</el-button>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])

onMounted(async () => {
  try {
    // const res = await axios.get('http://localhost:8000/api/users')
    // const res = await axios.get('/api/users')  // ✅ 关键修改
    // users.value = res.data
  } catch (error) {
    alert('获取用户列表失败')
  }
})
</script>
