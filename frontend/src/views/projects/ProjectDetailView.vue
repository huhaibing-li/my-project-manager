<!-- src/views/projects/ProjectDetailView.vue -->
<template>
  <div class="project-detail-container">
    <!-- 顶部标题区域 -->
    <div class="detail-header">
      <h2>{{ data.projectName }}</h2>
      <p class="project-desc">{{ data.projectOverview || '暂无描述' }}</p>
    </div>

    <!-- 标签栏 -->
    <div class="tags">
      <el-tag type="info">内部项目</el-tag>
      <el-tag type="warning">进行中</el-tag>
      <el-tag type="primary">管理员</el-tag>
    </div>

    <!-- 中间字段区域（三列） -->
    <div class="info-grid">
      <div class="info-item">
        <span class="label">项目编号：</span>
        <span class="value">{{ data.projectCode || '—' }}</span>
      </div>
      <div class="info-item">
        <span class="label">签约客户名称：</span>
        <span class="value">{{ data.currentClient || '—' }}</span>
      </div>
      <div class="info-item">
        <span class="label">终端客户名称：</span>
        <span class="value">{{ data.owningClient || '—' }}</span>
      </div>
      <div class="info-item">
        <span class="label">项目类型：</span>
        <span class="value">{{ data.product || '—' }}</span>
      </div>
      <div class="info-item">
        <span class="label">产品：</span>
        <span class="value">{{ data.product || '—' }}</span>
      </div>
      <div class="info-item">
        <span class="label">交付方式：</span>
        <span class="value">{{ data.deliveryMethod || '—' }}</span>
      </div>
      <div class="info-item">
        <span class="label">项目经理：</span>
        <span class="value">{{ data.projectManager || '—' }}</span>
      </div>
      <div class="info-item">
        <span class="label">项目成员：</span>
        <span class="value">{{ Array.isArray(data.projectMembers) ? data.projectMembers.join('、') : '—' }}</span>
      </div>
      <div class="info-item">
        <span class="label">合同金额：</span>
        <span class="value">{{ formatCurrency(data.contractAmount) }}</span>
      </div>
      <div class="info-item">
        <span class="label">预估成本：</span>
        <span class="value">{{ formatCurrency(data.estimatedCost) }}</span>
      </div>
      <div class="info-item">
        <span class="label">实际成本：</span>
        <span class="value">{{ formatCurrency(data.actualCost) }}</span>
      </div>
      <div class="info-item">
        <span class="label">预估利润率：</span>
        <span class="value">{{ formatPercent(data.budgetProfitMargin) }}</span>
      </div>
      <div class="info-item">
        <span class="label">实际利润率：</span>
        <span class="value">{{ formatPercent(data.actualProfitMargin) }}</span>
      </div>
      <div class="info-item">
        <span class="label">运维人天：</span>
        <span class="value">{{ data.maintenanceManDays || '—' }}</span>
      </div>
      <div class="info-item">
        <span class="label">合同人天：</span>
        <span class="value">{{ data.contractManDays || '—' }}</span>
      </div>
      <div class="info-item">
        <span class="label">实际人天：</span>
        <span class="value">{{ data.actualManDays || '—' }}</span>
      </div>
      <div class="info-item">
        <span class="label">项目开始日期：</span>
        <span class="value">{{ data.startDate || '—' }}</span>
      </div>
      <div class="info-item">
        <span class="label">项目结束日期：</span>
        <span class="value">{{ data.endDate || '—' }}</span>
      </div>
    </div>

    <!-- 项目运行详情表格 -->
    <div class="table-section">
      <div class="section-title">项目运行详情</div>
      <el-table :data="memberTableData" style="width: 100%" border>
        <el-table-column prop="seq" label="序号" width="60" />
        <el-table-column prop="name" label="成员名称" />
        <el-table-column prop="workType" label="工作类型" />
        <el-table-column prop="workContent" label="工作内容" />
        <el-table-column prop="costType" label="成员类型" />
        <el-table-column prop="joinDate" label="入职时间" />
        <el-table-column prop="leaveDate" label="出项时间" />
        <el-table-column prop="plannedManDays" label="计划人天" />
        <el-table-column prop="manDayCost" label="人天成本" />
        <el-table-column prop="billingManDays" label="消耗人天" />
        <el-table-column prop="actualCost" label="已消耗成本" />
        <el-table-column prop="paymentStatus" label="已完成交付额" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="startDate" label="创建时间" />
        <el-table-column prop="endDate" label="更新时间" />
        <el-table-column label="操作" width="80">
          <template #default="{ row }">
            <el-button size="small" type="primary">设置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 数据
const data = ref({})
const memberTableData = ref([
  { seq: 1, name: '张三', workType: '开发', workContent: '后端开发', costType: '正式员工', joinDate: '2025-01-10', leaveDate: '', plannedManDays: 120, manDayCost: 300, billingManDays: 90, actualCost: 27000, paymentStatus: '15000', remark: '', startDate: '2025-01-10', endDate: '2025-04-10' },
  { seq: 2, name: '李四', workType: '测试', workContent: '自动化测试', costType: '外包', joinDate: '2025-02-01', leaveDate: '', plannedManDays: 80, manDayCost: 250, billingManDays: 60, actualCost: 15000, paymentStatus: '12000', remark: '', startDate: '2025-02-01', endDate: '2025-04-10' },
  { seq: 3, name: '王五', workType: 'UI', workContent: '界面设计', costType: '正式员工', joinDate: '2025-01-15', leaveDate: '', plannedManDays: 40, manDayCost: 350, billingManDays: 35, actualCost: 12250, paymentStatus: '10000', remark: '', startDate: '2025-01-15', endDate: '2025-04-10' },
  { seq: 4, name: '赵六', workType: '前端', workContent: 'Vue开发', costType: '外包', joinDate: '2025-03-01', leaveDate: '', plannedManDays: 60, manDayCost: 280, billingManDays: 50, actualCost: 14000, paymentStatus: '11000', remark: '', startDate: '2025-03-01', endDate: '2025-04-10' }
])

// 格式化金额
const formatCurrency = (value) => {
  if (value == null) return '—'
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// 格式化百分比
const formatPercent = (value) => {
  if (value == null) return '—'
  return `${parseFloat(value).toFixed(2)}%`
}

// 模拟获取项目详情
const fetchDetail = async (id) => {
  try {
    // TODO: await api.getProject(id)
    await new Promise(r => setTimeout(r, 300))
    data.value = {
      id: id,
      projectName: '智能仓储系统开发',
      projectCode: 'FB1231231231231',
      currentClient: '京东物流',
      owningClient: '京东集团',
      product: '软件平台',
      deliveryMethod: '私有化部署',
      projectManager: '李华',
      projectMembers: ['张三', '李四', '王五'],
      contractAmount: 850000,
      estimatedCost: 620000,
      actualCost: 635000,
      budgetProfitMargin: 27.06,
      actualProfitMargin: 25.29,
      maintenanceManDays: 150,
      contractManDays: 400,
      actualManDays: 420,
      startDate: '2025-01-10',
      endDate: '2025-07-08',
      projectOverview: '为京东物流打造新一代智能仓储调度系统，支持AI路径优化与实时库存同步。',
      remarks: '需在Q2完成核心模块'
    }
  } catch (error) {
    console.error('加载失败:', error)
  }
}

onMounted(() => {
  const id = route.params.id
  if (!id) {
    router.push('/projects')
    return
  }
  fetchDetail(id)
})
</script>

<style scoped>
.project-detail-container {
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.detail-header {
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.detail-header h2 {
  margin: 0;
  font-size: 1.5em;
  color: #303133;
}

.project-desc {
  margin: 10px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.tags {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
}

.info-item .label {
  color: #999;
  font-weight: 500;
}

.info-item .value {
  color: #303133;
}

.table-section {
  margin-top: 20px;
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section-title {
  padding: 15px 20px;
  background: #f0f2f5;
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.el-table {
  margin: 0;
}
</style>