<!-- src/views/ProjectCreateView.vue -->
<template>
  <div class="project-create-container">
    <el-card class="form-card">
      <template #header>
        <div class="card-header">
          <span>新建项目</span>
        </div>
      </template>

      <el-form
        ref="createFormRef"
        :model="formData"
        :rules="rules"
        label-width="120px"
        size="small"
        :scroll-to-error="true"
      >
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目编号" prop="projectCode">
              <el-input v-model="formData.projectCode" placeholder="请输入唯一编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="formData.projectName" placeholder="请输入项目名称" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="当前客户名称" prop="currentClient">
              <el-input v-model="formData.currentClient" placeholder="当前对接客户" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属客户名称" prop="owningClient">
              <el-input v-model="formData.owningClient" placeholder="所属集团或组织" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="产品" prop="product">
              <el-input v-model="formData.product" placeholder="如：软件、硬件、平台等" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交付方式" prop="deliveryMethod">
              <el-input v-model="formData.deliveryMethod" placeholder="如：私有化、SaaS、云服务等" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第四行：项目概述 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="项目概述" prop="projectOverview">
              <el-input
                v-model="formData.projectOverview"
                type="textarea"
                :rows="3"
                placeholder="简要描述项目背景、目标和主要内容"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目经理" prop="projectManager">
              <el-input v-model="formData.projectManager" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目成员">
              <el-select
                v-model="formData.projectMembers"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="输入并回车添加成员"
                style="width: 100%"
              >
                <el-option
                  v-for="item in memberOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第六行：金额与利润 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="合同金额(元)" prop="contractAmount">
              <el-input-number
                v-model="formData.contractAmount"
                :min="0"
                :precision="2"
                placeholder="0.00"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预算利润率(%)" prop="budgetProfitMargin">
              <el-input-number
                v-model="formData.budgetProfitMargin"
                :min="0"
                :max="100"
                :precision="2"
                placeholder="0.00"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同天数" prop="contractDays">
              <el-input-number
                v-model="formData.contractDays"
                :min="1"
                :precision="0"
                placeholder="天数"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第七行：成本 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="预估成本(元)" prop="estimatedCost">
              <el-input-number
                v-model="formData.estimatedCost"
                :min="0"
                :precision="2"
                placeholder="0.00"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际人天">
              <el-input-number
                v-model="formData.actualManDays"
                :min="0"
                :precision="0"
                placeholder="人·天"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际成本(元)">
              <el-input-number
                v-model="formData.actualCost"
                :min="0"
                :precision="2"
                placeholder="0.00"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第八行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="回款人天">
              <el-input-number
                v-model="formData.billingManDays"
                :min="0"
                :precision="0"
                placeholder="人·天"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际利润率(%)">
              <el-input-number
                v-model="formData.actualProfitMargin"
                :min="0"
                :max="100"
                :precision="2"
                placeholder="0.00"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>

        <!-- 第九行：日期 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目开始日期" prop="startDate">
              <el-date-picker
                v-model="formData.startDate"
                type="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目结束日期">
              <el-date-picker
                v-model="formData.endDate"
                type="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第十行：状态与备注 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目状态" prop="projectStatus">
              <el-select v-model="formData.projectStatus" placeholder="请选择" style="width: 100%">
                <el-option label="立项" value="立项" />
                <el-option label="开发中" value="开发中" />
                <el-option label="测试" value="测试" />
                <el-option label="已上线" value="已上线" />
                <el-option label="已关闭" value="已关闭" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input v-model="formData.remarks" placeholder="补充说明、风险提示等" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 操作按钮 -->
        <el-form-item style="text-align: right; margin-top: 30px">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submitForm" :loading="submitting">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const createFormRef = ref(null)
const submitting = ref(false)

// 成员建议（可从 API 获取，此处模拟）
const memberOptions = ref([
  '张三', '李四', '王五', '赵六', '陈七'
])

// 表单数据
const formData = reactive({
  projectCode: '',
  projectName: '',
  currentClient: '',
  owningClient: '',
  product: '',
  deliveryMethod: '',
  projectOverview: '',
  projectManager: '',
  projectMembers: [],
  contractAmount: null,
  budgetProfitMargin: null,
  contractDays: null,
  estimatedCost: null,
  actualManDays: null,
  actualCost: null,
  billingManDays: null,
  actualProfitMargin: null,
  startDate: '',
  endDate: '',
  projectStatus: '',
  remarks: ''
})

// 校验规则
const rules = {
  projectCode: [{ required: true, message: '请输入项目编号', trigger: 'blur' }],
  projectName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  currentClient: [{ required: true, message: '请输入当前客户名称', trigger: 'blur' }],
  owningClient: [{ required: true, message: '请输入所属客户名称', trigger: 'blur' }],
  projectManager: [{ required: true, message: '请输入项目经理', trigger: 'blur' }],
  contractAmount: [{ required: true, message: '请输入合同金额', trigger: 'blur' }],
  budgetProfitMargin: [{ required: true, message: '请输入预算利润率', trigger: 'blur' }],
  contractDays: [{ required: true, message: '请输入合同天数', trigger: 'blur' }],
  estimatedCost: [{ required: true, message: '请输入预估成本', trigger: 'blur' }],
  startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
  projectStatus: [{ required: true, message: '请选择项目状态', trigger: 'change' }]
}

// 方法
const cancel = () => {
  router.push('/projects')
}

const submitForm = async () => {
  await createFormRef.value.validate(async (valid) => {
    if (!valid) return

    submitting.value = true
    try {
      // TODO: 调用后端 API 创建项目
      // const res = await api.createProject(formData)
      // ElMessage.success('项目创建成功')
      console.log('提交数据:', formData)
      ElMessage.success('项目创建成功（模拟）')
      router.push('/projects')
    } catch (error) {
      ElMessage.error('创建失败，请重试')
    } finally {
      submitting.value = false
    }
  })
}
</script>

<style scoped>
.project-create-container {
  padding: 20px;
}
.form-card {
  max-width: 1000px;
  margin: 0 auto;
}
.card-header {
  font-size: 18px;
  font-weight: bold;
}
</style>