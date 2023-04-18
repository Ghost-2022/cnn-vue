import request from '@/config/axios'
import type { UploadType } from './types'

export const UploadApi = (data: UploadType): Promise<IResponse<any>> => {
  return request.post({ url: '/api/identify-file', data })
}
