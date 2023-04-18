<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Form } from '@/components/Form'
import { computed, reactive, unref, ref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { FormSchema } from '@/types/form'
import { ElButton, ElImage } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
import { FormType } from '@/api/form/types'
import { TrainApi, GetTrainResultApi } from '@/api/form'
import { useValidator } from '@/hooks/web/useValidator'

const { required } = useValidator()
const { t } = useI18n()

const appStore = useAppStore()

const isMobile = computed(() => appStore.getMobile)

const { register, elFormRef, methods } = useForm()

const timer = ref(0)
const isShow = ref(false)

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
  if (res['data']['status']) {
    window.clearInterval(timer.value)
    avgLossSrc.value = res['data']['avgLoss']
    trainPngSrc.value = res['data']['trainPng']
    testPngSrc.value = res['data']['testPng']
    isShow.value = true
  }
}

const onSave = async () => {
  const formRef = unref(elFormRef)
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      const { getFormData } = methods
      const formData = await getFormData<FormType>()
      try {
        const res = await TrainApi(formData)
        if (res['data']) {
          timer.value = window.setInterval(checkStatus, 3 * 1000)
        }
      } finally {
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
      ><ElButton type="primary" @click="onSave">提交</ElButton></div
    >
    <div v-show="isShow" style="display: flex; justify-content: center">
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
</style>
