import { requestClient } from '#/api/request';

export interface PayContract {
  id: number;
  user_id: number;
  channel_code: string;
  contract_no: string;
  channel_contract_id: string | null;
  tier: string;
  billing_cycle: string;
  deduct_amount: number;
  status: number;
  signed_time: string | null;
  terminated_time: string | null;
  next_deduct_date: string | null;
  deduct_count: number;
  created_time: string;
}

export async function getPayContractListApi(params?: Record<string, any>) {
  return requestClient.get('/api/v1/pay/contracts', { params });
}

export async function getPayContractDetailApi(pk: number) {
  return requestClient.get(`/api/v1/pay/contracts/${pk}`);
}
