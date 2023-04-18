<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { reactive, ref } from 'vue'
import { ElUpload, ElButton } from 'element-plus'
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadFile,
  UploadFiles
} from 'element-plus'
import { useTable } from '@/hooks/web/useTable'
import { Table } from '@/components/Table'
import { TableData } from '@/api/table/types'
import { getBadDatasetListApi } from '@/api/table'
import { TableColumn } from '@/types/table'

const { t } = useI18n()
const upload = ref<UploadInstance>()

const baseUrl = import.meta.env.VITE_BASE_URL

const uploadUrl = baseUrl + '/api/identify-file'

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}
const isShow = ref(false)

const handlerSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  isShow.value = true
  getList()
}
const columns = reactive<TableColumn[]>([
  { field: 'duration', label: 'duration' },
  { field: 'protocol_type', label: 'protocol_type' },
  { field: 'service', label: 'service' },
  { field: 'flag', label: 'flag' },
  { field: 'src_bytes', label: 'src_bytes' },
  { field: 'dst_bytes', label: 'dst_bytes' },
  { field: 'land', label: 'land' },
  { field: 'wrong_fragment', label: 'wrong_fragment' },
  { field: 'urgent', label: 'urgent' },
  { field: 'hot', label: 'hot' },
  { field: 'num_failed_logins', label: 'num_failed_logins' },
  { field: 'logged_in', label: 'logged_in' },
  { field: 'num_compromised', label: 'num_compromised' },
  { field: 'root_shell', label: 'root_shell' },
  { field: 'su_attempted', label: 'su-attempted' },
  { field: 'num_root', label: 'num_root' },
  { field: 'num_file_creations', label: 'num_file_creations' },
  { field: 'num_shells', label: 'num_shells' },
  { field: 'num_access_files', label: 'num_access_files' },
  { field: 'num_outbound_cmds', label: 'num_outbound_cmds' },
  { field: 'is_hot_login', label: 'is_hot_login' },
  { field: 'is_guest_login', label: 'is_guest_login' },
  { field: 'count', label: 'count' },
  { field: 'srv_count', label: 'srv_count' },
  { field: 'serror_rate', label: 'serror_rate' },
  { field: 'srv_serror_rate', label: 'srv_serror_rate' },
  { field: 'rerror_rate', label: 'rerror_rate' },
  { field: 'srv_rerror_rate', label: 'srv_rerror_rate' },
  { field: 'same_srv_rate', label: 'same_srv_rate' },
  { field: 'diff_srv_rate', label: 'diff_srv_rate' },
  { field: 'srv_diff_host_rate', label: 'srv_diff_host_rate' },
  { field: 'dst_host_count', label: 'dst_host_count' },
  { field: 'dst_host_srv_count', label: 'dst_host_srv_count' },
  { field: 'dst_host_same_srv_rate', label: 'dst_host_same_srv_rate' },
  { field: 'dst_host_diff_srv_rate', label: 'dst_host_diff_srv_rate' },
  { field: 'dst_host_same_src_port_rate', label: 'dst_host_same_src_port_rate' },
  { field: 'dst_host_srv_diff_host_rate', label: 'dst_host_srv_diff_host_rate' },
  { field: 'dst_host_serror_rate', label: 'dst_host_serror_rate' },
  { field: 'dst_host_srv_serror_rate', label: 'dst_host_srv_serror_rate' },
  { field: 'dst_host_rerror_rate', label: 'dst_host_rerror_rate' },
  { field: 'dst_host_srv_rerror_rate', label: 'dst_host_srv_rerror_rate' },
  { field: 'bad_class', label: 'class' }
])

const { register, tableObject, methods } = useTable<TableData>({
  getListApi: getBadDatasetListApi,
  response: {
    list: 'list',
    total: 'total'
  },
  props: {
    columns
  }
})
const { getList } = methods
</script>

<template>
  <ContentWrap :title="t('TrafficIdentification.title')">
    <ElUpload
      ref="upload"
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :action="uploadUrl"
      :on-success="handlerSuccess"
    >
      <template #trigger>
        <ElButton type="primary">选择文件</ElButton>
      </template>
      <ElButton class="ml-3" type="success" @click="submitUpload">上传</ElButton>
      <template #tip>
        <div class="el-upload__tip text-red"> 只能上传1个文件，新文件将覆盖旧文件 </div>
      </template>
    </ElUpload>
    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      :expand="true"
      @register="register"
      v-show="isShow"
    />
  </ContentWrap>
</template>
