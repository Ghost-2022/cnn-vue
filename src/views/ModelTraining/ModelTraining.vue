<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Form } from '@/components/Form'
import { computed, reactive, unref, ref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { FormSchema } from '@/types/form'
import { ElButton, ElImage, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
import { FormType } from '@/api/form/types'
import { TrainApi, GetTrainResultApi } from '@/api/form'
import { useValidator } from '@/hooks/web/useValidator'

const { required } = useValidator()
const { t } = useI18n()

const appStore = useAppStore()

const isMobile = computed(() => appStore.getMobile)

const { register, elFormRef, methods } = useForm()

const timerCheckStatus = ref(0)
const tableData = ref([])
const isShow = ref(false)
const disableBtn = ref(false)

const rules = {
  learningRate: [required()],
  batchSize: [required()],
  epoch: [required()]
}
const schema = reactive<FormSchema[]>([
  {
    field: 'learningRate',
    label: t('formDemo.learningRate'),
    component: 'Input'
  },
  {
    field: 'batchSize',
    label: t('formDemo.batchSize'),
    component: 'Input'
  },
  {
    field: 'epoch',
    label: t('formDemo.epoch'),
    component: 'Input'
  }
])

const avgLossSrc = ref('')
const trainPngSrc = ref('')
const testPngSrc = ref('')

const checkStatus = async () => {
  const res = await GetTrainResultApi()
  tableData.value = res['data']['list']
  if (!res['data']['status']) {
    window.clearInterval(timerCheckStatus.value)
    avgLossSrc.value = res['data']['avgLoss']
    trainPngSrc.value = res['data']['trainPng']
    testPngSrc.value = res['data']['testPng']
    isShow.value = true
    disableBtn.value = false
  }
}

const onSave = async () => {
  const formRef = unref(elFormRef)
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      const { getFormData } = methods
      const formData = await getFormData<FormType>()
      try {
        disableBtn.value = true
        avgLossSrc.value = ''
        trainPngSrc.value = ''
        testPngSrc.value = ''
        const res = await TrainApi(formData)
        if (res['code'] === '0000') {
          tableData.value = []
          isShow.value = false
          timerCheckStatus.value = window.setInterval(checkStatus, 10 * 1000)
          ElMessage({
            message: t('ModelTraining.SuccessMsg'),
            type: 'success'
          })
        } else {
          ElMessage.error(res['message'])
        }
      } finally {
        ElMessage.error(t('ModelTraining.ErrorMsg'))
      }
    }
  })
}
</script>

<template>
  <ContentWrap :title="t('ModelTraining.ModelTraining')">
    <Form
      :schema="schema"
      label-width="25%"
      :rules="rules"
      :label-position="isMobile ? 'top' : 'right'"
      :isCol="true"
      @register="register"
    />
    <div style="display: flex; justify-content: center"
      ><ElButton type="primary" @click="onSave" :disabled="disableBtn">提交</ElButton></div
    >
    <ElTable :data="tableData">
      <ElTableColumn prop="epoch" label="epoch" />
      <ElTableColumn prop="loss" label="loss" />
      <ElTableColumn prop="accuracy" label="accuracy" />
      <ElTableColumn prop="test_loss" label="test_loss" />
      <ElTableColumn prop="test_accuracy" label="test_accuracy" />
    </ElTable>
    <div v-show="isShow" style="display: flex; justify-content: center; margin-top: 20px">
      <ElImage :src="avgLossSrc" />
      <ElImage :src="trainPngSrc" />
      <ElImage :src="testPngSrc" />
    </div>
  </ContentWrap>
</template>

<style lang="less" scoped>
.el-image {
  height: 300px;
}
.el-form {
  width: 50%;
  margin-left: 25%;
}
.el-table {
  width: 50%;
  margin: 20px 0 20px 25%;
}
</style>
