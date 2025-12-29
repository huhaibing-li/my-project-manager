<!-- src/views/ProjectListView.vue -->
<template>
  <div class="project-list-container">
    <h2 class="page-title">项目总览</h2>



    <!-- 筛选表单 -->
    <el-form :model="filters" label-width="100px" class="filter-form">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="项目编号">
            <el-input v-model="filters.projectCode" clearable placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名称">
            <el-input v-model="filters.projectName" clearable placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="当前客户">
            <el-input v-model="filters.currentClient" clearable placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属客户">
            <el-input v-model="filters.owningClient" clearable placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item label="项目经理">
            <el-input v-model="filters.projectManager" clearable placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目状态">
            <el-select v-model="filters.projectStatus" clearable placeholder="请选择" style="width: 100%">
              <el-option label="立项" value="立项" />
              <el-option label="开发中" value="开发中" />
              <el-option label="测试" value="测试" />
              <el-option label="已上线" value="已上线" />
              <el-option label="已关闭" value="已关闭" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品">
            <el-input v-model="filters.product" clearable placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="交付方式">
            <el-input v-model="filters.deliveryMethod" clearable placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="resetFilters">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 顶部操作栏 -->
    <div class="action-bar">
      <div></div>
      <div>
        <el-button type="primary" @click="goToCreate">
          <template #icon>
            <Plus />
          </template>
          新建
        </el-button>

        <el-button type="success" @click="exportExcel">
          <template #icon>
            <Download />
          </template>
          导出
        </el-button>
      </div>
    </div>
    <!-- 项目表格 -->
    <el-table :data="tableData" border v-loading="loading" style="width: 100%; margin-top: 20px" max-height="600">
      <!-- 字段列 -->
      <el-table-column prop="projectCode" label="项目编号" width="120" fixed />
      <el-table-column prop="projectName" label="项目名称" min-width="150" />
      <el-table-column prop="currentClient" label="当前客户名称" min-width="120" />
      <el-table-column prop="owningClient" label="所属客户名称" min-width="120" />
      <el-table-column prop="product" label="产品" width="100" />
      <el-table-column prop="deliveryMethod" label="交付方式" width="100" />
      <el-table-column prop="projectOverview" label="项目概述" min-width="200" show-overflow-tooltip />
      <el-table-column prop="projectManager" label="项目经理" width="100" />
      <el-table-column prop="projectMembers" label="项目成员" min-width="120" show-overflow-tooltip>
        <template #default="{ row }">
          {{ Array.isArray(row.projectMembers) ? row.projectMembers.join('、') : row.projectMembers }}
        </template>
      </el-table-column>
      <el-table-column prop="contractAmount" label="合同金额(元)" width="120">
        <template #default="{ row }">{{ formatCurrency(row.contractAmount) }}</template>
      </el-table-column>
      <el-table-column prop="budgetProfitMargin" label="预算利润率(%)" width="120">
        <template #default="{ row }">{{ formatPercent(row.budgetProfitMargin) }}</template>
      </el-table-column>
      <el-table-column prop="contractDays" label="合同天数" width="100" />
      <el-table-column prop="estimatedCost" label="预估成本(元)" width="120">
        <template #default="{ row }">{{ formatCurrency(row.estimatedCost) }}</template>
      </el-table-column>
      <el-table-column prop="actualManDays" label="实际人天" width="100" />
      <el-table-column prop="actualCost" label="实际成本(元)" width="120">
        <template #default="{ row }">{{ formatCurrency(row.actualCost) }}</template>
      </el-table-column>
      <el-table-column prop="billingManDays" label="回款人天" width="100" />
      <el-table-column prop="actualProfitMargin" label="实际利润率(%)" width="120">
        <template #default="{ row }">{{ formatPercent(row.actualProfitMargin) }}</template>
      </el-table-column>
      <el-table-column prop="startDate" label="项目开始日期" width="120" />
      <el-table-column prop="projectStatus" label="项目状态" width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.projectStatus)">
            {{ row.projectStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="endDate" label="项目结束日期" width="120" />
      <el-table-column prop="remarks" label="备注" min-width="150" show-overflow-tooltip />
      <el-table-column prop="createdAt" label="创建时间" width="160" />
      <el-table-column prop="updatedAt" label="更新时间" width="160" />

      <!-- 操作列 -->
      <el-table-column label="操作" fixed="right" width="180">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="editProject(row.id)">编辑</el-button>
          <el-button link type="info" size="small" @click="viewDetail(row.id)">详情</el-button>
          <el-button link type="danger" size="small" @click="deleteProject(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination v-if="total > 0" v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total"
      layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50]"
      style="margin-top: 20px; text-align: right" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />

    <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
      <el-form :model="form">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            Confirm
            .3
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as XLSX from 'xlsx'
import { Plus, Download } from '@element-plus/icons-vue'

const router = useRouter()

// 状态
const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 筛选条件（仅展示常用字段）
const filters = ref({
  projectCode: '',
  projectName: '',
  currentClient: '',
  owningClient: '',
  projectManager: '',
  projectStatus: '',
  product: '',
  deliveryMethod: ''
})

// 工具函数
const formatCurrency = (value) => {
  if (value == null || value === '') return '—'
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

const formatPercent = (value) => {
  if (value == null || value === '') return '—'
  return `${parseFloat(value).toFixed(2)}%`
}

const getStatusType = (status) => {
  const map = {
    '立项': 'info',
    '开发中': 'warning',
    '测试': 'primary',
    '已上线': 'success',
    '已关闭': 'danger'
  }
  return map[status] || ''
}

// 模拟数据（请替换为真实 API 调用）
const fetchProjects = async () => {
  loading.value = true
  try {
    // TODO: 替换为真实后端接口
    await new Promise(r => setTimeout(r, 300))
    tableData.value = [
      {
        id: 1,
        projectCode: 'PM2025001',
        projectName: '智能仓储系统开发',
        currentClient: '京东物流',
        owningClient: '京东集团',
        product: '软件平台',
        deliveryMethod: '私有化部署',
        projectOverview: '为京东物流打造新一代智能仓储调度系统，支持AI路径优化与实时库存同步。',
        projectManager: '李华',
        projectMembers: ['张三', '李四', '王五'],
        contractAmount: 850000,
        budgetProfitMargin: 27.06,
        contractDays: 180,
        estimatedCost: 620000,
        actualManDays: 420,
        actualCost: 635000,
        billingManDays: 400,
        actualProfitMargin: 25.29,
        startDate: '2025-01-10',
        projectStatus: '开发中',
        endDate: '2025-07-08',
        remarks: '需在Q2完成核心模块',
        createdAt: '2025-01-05 10:23:15',
        updatedAt: '2025-04-10 14:30:22'
      }
    ]
    total.value = tableData.value.length
  } catch (error) {
    ElMessage.error('加载项目列表失败')
  } finally {
    loading.value = false
  }
}

// 操作方法
const handleSearch = () => {
  currentPage.value = 1
  fetchProjects()
}

const resetFilters = () => {
  Object.keys(filters.value).forEach(key => filters.value[key] = '')
  currentPage.value = 1
  fetchProjects()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  fetchProjects()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchProjects()
}

const goToCreate = () => router.push('/projects/new')
const viewDetail = (id) => router.push(`/projects/${id}`)
const editProject = (id) => router.push(`/projects/edit/${id}`)
const deleteProject = async (id) => {
  try {
    await ElMessageBox.confirm('确定删除该项目？此操作不可恢复。', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    // TODO: 调用删除 API
    ElMessage.success('删除成功')
    fetchProjects()
  } catch (err) {
    // 用户取消
  }
}

// 导出 Excel
const exportExcel = () => {
  if (tableData.value.length === 0) {
    ElMessage.warning('无数据可导出')
    return
  }

  const data = tableData.value.map(item => ({
    项目编号: item.projectCode,
    项目名称: item.projectName,
    当前客户名称: item.currentClient,
    所属客户名称: item.owningClient,
    产品: item.product,
    交付方式: item.deliveryMethod,
    项目概述: item.projectOverview,
    项目经理: item.projectManager,
    项目成员: Array.isArray(item.projectMembers) ? item.projectMembers.join('、') : item.projectMembers,
    合同金额_元: item.contractAmount,
    预算利润率_百分比: item.budgetProfitMargin,
    合同天数: item.contractDays,
    预估成本_元: item.estimatedCost,
    实际人天: item.actualManDays,
    实际成本_元: item.actualCost,
    回款人天: item.billingManDays,
    实际利润率_百分比: item.actualProfitMargin,
    项目开始日期: item.startDate,
    项目状态: item.projectStatus,
    项目结束日期: item.endDate,
    备注: item.remarks,
    创建时间: item.createdAt,
    更新时间: item.updatedAt
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '项目总览')
  XLSX.writeFile(wb, '项目总览.xlsx')
}

// 初始化
onMounted(fetchProjects)
</script>

<style scoped>
.project-list-container {
  /* padding: 20px; */
}

.page-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.action-bar {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  margin-bottom: 20px;
}

.filter-form {
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.el-pagination {
  float: right;
}
</style>