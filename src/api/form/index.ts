import request from '@/config/axios'
import type { FormType } from './types'

export const TrainApi = (data: FormType): Promise<IResponse<any>> => {
  return request.post({ url: '/api/train', data })
}

export const GetTrainResultApi = (): Promise<IResponse<any>> => {
  return request.get({ url: '/api/get-train-result' })
}

export const GetResultApi = (): Promise<IResponse<any>> => {
  return request.get({ url: '/api/get-train-status' })
}
