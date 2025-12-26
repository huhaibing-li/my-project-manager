<template>
  <div class="project-list">
    <h2>项目总览</h2>
    <el-table :data="projects" style="width: 100%">
      <el-table-column prop="project_code" label="项目编号" />
      <el-table-column prop="project_name" label="项目名称" />
      <el-table-column prop="client_name" label="客户" />
      <el-table-column prop="manager" label="项目经理" />
      <el-table-column prop="start_date" label="开始日期" />
      <el-table-column prop="end_date" label="结束日期" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button size="small" @click="$router.push(`/projects/${row.id}`)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProjects } from '@/api/project'

const projects = ref([])

onMounted(async () => {
  try {
    const res = await getProjects({ page: 1, size: 10 })
    projects.value = res.data.data
  } catch (error) {
    alert('获取项目列表失败')
  }
})
</script>