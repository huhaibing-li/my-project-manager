<!-- src/components/projects/ProjectForm.vue -->
<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="80px"
    @submit.prevent
  >
    <el-form-item label="项目名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入项目名称" />
    </el-form-item>

    <el-form-item label="描述" prop="description">
      <el-input
        v-model="form.description"
        type="textarea"
        placeholder="请输入项目描述"
        :rows="3"
      />
    </el-form-item>

    <el-form-item label="负责人" prop="owner">
      <el-input v-model="form.owner" placeholder="请输入负责人" />
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-select v-model="form.status" placeholder="请选择状态">
        <el-option label="规划中" value="planning" />
        <el-option label="进行中" value="in_progress" />
        <el-option label="已完成" value="completed" />
        <el-option label="已暂停" value="paused" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, defineProps, defineEmits, nextTick } from 'vue'
import { ElForm } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'validate'])

const form = ref({ ...props.modelValue })

// 监听外部 modelValue 变化（用于编辑时回显）
watch(
  () => props.modelValue,
  (newVal) => {
    form.value = { ...newVal }
  },
  { deep: true }
)

// 表单校验规则
const rules = {
  name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  owner: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

// 暴露方法给父组件
defineExpose({
  validate: async () => {
    const valid = await formRef.value.validate().catch(() => false)
    return valid ? form.value : false
  },
  reset: () => {
    formRef.value.resetFields()
  }
})

const formRef = ref()

// 同步内部值到外部（可选，用于实时绑定）
watch(form, (val) => {
  emit('update:modelValue', val)
})
</script>