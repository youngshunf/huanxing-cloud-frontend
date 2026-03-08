import { requestClient } from '#/api/request';

export interface PayMerchant {
  id: number;
  name: string;
  type: string;
  config: Record<string, any>;
  status: number;
  remark?: string;
  created_time?: string;
  updated_time?: string;
}

export interface PayMerchantSimple {
  id: number;
  name: string;
  type: string;
  status: number;
}

/** 分页列表 */
export function getPayMerchantListApi(params: Record<string, any>) {
  return requestClient.get('/api/v1/pay/merchants', { params });
}

/** 全部启用商户（下拉选择） */
export function getPayMerchantSimpleApi() {
  return requestClient.get<PayMerchantSimple[]>('/api/v1/pay/merchants/simple');
}

/** 详情 */
export function getPayMerchantApi(id: number) {
  return requestClient.get<PayMerchant>(`/api/v1/pay/merchants/${id}`);
}

/** 创建 */
export function createPayMerchantApi(data: Partial<PayMerchant>) {
  return requestClient.post('/api/v1/pay/merchants', data);
}

/** 更新 */
export function updatePayMerchantApi(id: number, data: Partial<PayMerchant>) {
  return requestClient.put(`/api/v1/pay/merchants/${id}`, data);
}

/** 删除 */
export function deletePayMerchantApi(ids: number[]) {
  return requestClient.delete('/api/v1/pay/merchants', { params: { pk: ids } });
}
