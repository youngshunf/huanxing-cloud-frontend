import { requestClient } from '#/api/request';

export interface PayNotifyLog {
  id: number;
  order_no: string | null;
  channel_code: string | null;
  notify_type: string;
  notify_data: string | null;
  status: number;
  error_msg: string | null;
  created_time: string;
}

export async function getPayNotifyLogListApi(params?: Record<string, any>) {
  return requestClient.get('/api/v1/pay/notify-logs', { params });
}
