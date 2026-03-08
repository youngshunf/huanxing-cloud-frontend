import { requestClient } from '#/api/request';

/**
 * HasnMessages API
 */

// Types
export interface HasnMessages {
  id: number;
  conversation_id: string;
  from_id: string;
  from_type: number;
  content: string;
  content_type: number;
  metadata?: Record<string, any>;
  reply_to?: number;
  status: number;
  created_time: string;
  updated_time?: string;
}

export interface HasnMessagesParams {
  page?: number;
  size?: number;
  conversation_id?: string;
  from_id?: string;
  from_type?: number;
  content_type?: number;
  status?: number;
  created_time?: string;
  updated_time?: string;
}

export interface HasnMessagesCreateParams {
  conversation_id: string;
  from_id: string;
  from_type: number;
  content: string;
  content_type: number;
  metadata?: Record<string, any>;
  reply_to?: number;
  status: number;
}

export interface HasnMessagesListResult {
  items: HasnMessages[];
  total: number;
}

// API functions
export async function getHasnMessagesListApi(params: HasnMessagesParams): Promise<HasnMessagesListResult> {
  return requestClient.get<HasnMessagesListResult>('/api/v1/hasn/admin/messages', { params });
}

export async function getHasnMessagesApi(id: number): Promise<HasnMessages> {
  return requestClient.get<HasnMessages>(`/api/v1/hasn/admin/messages/${id}`);
}

export async function createHasnMessagesApi(data: HasnMessagesCreateParams): Promise<HasnMessages> {
  return requestClient.post<HasnMessages>('/api/v1/hasn/admin/messages', data);
}

export async function updateHasnMessagesApi(id: number, data: Partial<HasnMessagesCreateParams>): Promise<HasnMessages> {
  return requestClient.put<HasnMessages>(`/api/v1/hasn/admin/messages/${id}`, data);
}

export async function deleteHasnMessagesApi(id: number): Promise<void> {
  return requestClient.delete<void>('/api/v1/hasn/admin/messages', { data: { pks: [id] } });
}
