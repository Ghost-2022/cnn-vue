import request from '@/config/axios'
import type { TableData } from './types'

export const getTableListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/api/', params })
}

export const saveTableApi = (data: Partial<TableData>): Promise<IResponse> => {
  return request.post({ url: '/example/save', data })
}

export const getTableDetApi = (id: string): Promise<IResponse<TableData>> => {
  return request.get({ url: '/example/detail', params: { id } })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: '/example/delete', data: { ids } })
}

export const getTrainsetListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/api/get-train-set', params })
}

export const getTestsetListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/api/get-test-set', params })
}

export const getBadDatasetListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/api/get-bad-data', params })
}
