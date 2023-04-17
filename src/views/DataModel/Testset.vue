<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { getTrainsetListApi } from '@/api/table'
import { TableData } from '@/api/table/types'
import { reactive } from 'vue'
import { useTable } from '@/hooks/web/useTable'
import { Pagination, TableColumn, TableSlotDefault } from '@/types/table'

const { t } = useI18n()

const columns = reactive<TableColumn[]>([
  {
    field: 'feature_1',
    label: '特征1'
  },
  {
    field: 'feature_2',
    label: '特征2'
  },
  {
    field: 'feature_3',
    label: '特征3'
  },
  {
    field: 'feature_4',
    label: '特征4'
  },
  {
    field: 'feature_5',
    label: '特征5'
  },
  {
    field: 'feature_6',
    label: '特征6'
  },
  {
    field: 'feature_7',
    label: '特征7'
  },
  {
    field: 'feature_8',
    label: '特征8'
  },
  {
    field: 'feature_9',
    label: '特征9'
  },
  {
    field: 'feature_10',
    label: '特征10'
  },
  {
    field: 'feature_11',
    label: '特征11'
  },
  {
    field: 'feature_12',
    label: '特征12'
  },
  {
    field: 'feature_13',
    label: '特征13'
  },
  {
    field: 'feature_14',
    label: '特征14'
  },
  {
    field: 'feature_15',
    label: '特征15'
  },
  {
    field: 'feature_16',
    label: '特征16'
  },
  {
    field: 'feature_17',
    label: '特征17'
  },
  {
    field: 'feature_18',
    label: '特征18'
  },
  {
    field: 'feature_19',
    label: '特征19'
  },
  {
    field: 'feature_20',
    label: '特征20'
  },
  {
    field: 'feature_21',
    label: '特征21'
  },
  {
    field: 'feature_22',
    label: '特征22'
  },
  {
    field: 'feature_23',
    label: '特征23'
  },
  {
    field: 'feature_24',
    label: '特征24'
  },
  {
    field: 'feature_25',
    label: '特征25'
  },
  {
    field: 'feature_26',
    label: '特征26'
  },
  {
    field: 'feature_27',
    label: '特征27'
  },
  {
    field: 'feature_28',
    label: '特征28'
  },
  {
    field: 'feature_29',
    label: '特征29'
  },
  {
    field: 'feature_30',
    label: '特征30'
  },
  {
    field: 'feature_31',
    label: '特征31'
  },
  {
    field: 'feature_32',
    label: '特征32'
  },
  {
    field: 'feature_33',
    label: '特征33'
  },
  {
    field: 'feature_34',
    label: '特征34'
  },
  {
    field: 'feature_35',
    label: '特征35'
  },
  {
    field: 'feature_36',
    label: '特征36'
  },
  {
    field: 'feature_37',
    label: '特征37'
  },
  {
    field: 'feature_38',
    label: '特征38'
  },
  {
    field: 'feature_39',
    label: '特征39'
  },
  {
    field: 'feature_40',
    label: '特征40'
  },
  {
    field: 'feature_41',
    label: '特征41'
  },
  {
    field: 'feature_42',
    label: '特征42'
  }
])

const { register, tableObject, methods } = useTable<TableData>({
  getListApi: getTrainsetListApi,
  response: {
    list: 'list',
    total: 'total'
  },
  props: {
    columns
  }
})

const { getList } = methods

getList()
</script>

<template>
  <ContentWrap :title="t('DataModel.Testset')">
    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    />
  </ContentWrap>
</template>
