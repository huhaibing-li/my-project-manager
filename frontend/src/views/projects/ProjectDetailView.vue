<template>
  <div class="project-detail">
    <h2>项目详情 - {{ project?.project_name }}</h2>
    <el-descriptions :column="3" border>
      <el-descriptions-item label="项目编号">{{ project?.project_code }}</el-descriptions-item>
      <el-descriptions-item label="客户名称">{{ project?.client_name }}</el-descriptions-item>
      <el-descriptions-item label="项目经理">{{ project?.manager }}</el-descriptions-item>
      <el-descriptions-item label="项目类型">{{ project?.project_type }}</el-descriptions-item>
      <el-descriptions-item label="开始日期">{{ project?.start_date }}</el-descriptions-item>
      <el-descriptions-item label="结束日期">{{ project?.end_date }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProjectDetail } from '@/api/project'

const route = useRoute()
const project = ref(null)

onMounted(async () => {
  try {
    const res = await getProjectDetail(Number(route.params.id))
    project.value = res.data
  } catch (error) {
    alert('获取项目详情失败')
  }
})
</script>
