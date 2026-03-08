import { requestClient } from '#/api/request';

/**
 * 发布记录表 API
 */

// Types
export interface HxCreatorPublish {
  content_id: number;
  account_id?: number;
  user_id: number;
  platform: string;
  publish_url?: string;
  status?: string;
  method?: string;
  error_message?: string;
  published_at?: string;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  favorites?: number;
  metrics_json?: Record<string, any>;
  metrics_updated_at?: string;
}

export interface HxCreatorPublishParams {
  page?: number;
  size?: number;
  content_id?: number;
  account_id?: number;
  user_id?: number;
  status?: string;
  published_at?: string;
  metrics_updated_at?: string;
}

export interface HxCreatorPublishCreateParams {
  content_id: number;
  account_id?: number;
  user_id: number;
  platform: string;
  publish_url?: string;
  status?: string;
  method?: string;
  error_message?: string;
  published_at?: string;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  favorites?: number;
  metrics_json?: Record<string, any>;
  metrics_updated_at?: string;
}

export interface HxCreatorPublishListResult {
  items: HxCreatorPublish[];
  total: number;
}

// API functions
export async function getHxCreatorPublishListApi(params: HxCreatorPublishParams): Promise<HxCreatorPublishListResult> {
  return requestClient.get<HxCreatorPublishListResult>('/api/v1/creator/publishes', { params });
}

export async function getHxCreatorPublishApi(id: number): Promise<HxCreatorPublish> {
  return requestClient.get<HxCreatorPublish>(`/api/v1/creator/publishes/${id}`);
}

export async function createHxCreatorPublishApi(data: HxCreatorPublishCreateParams): Promise<HxCreatorPublish> {
  return requestClient.post<HxCreatorPublish>('/api/v1/creator/publishes', data);
}

export async function updateHxCreatorPublishApi(id: number, data: Partial<HxCreatorPublishCreateParams>): Promise<HxCreatorPublish> {
  return requestClient.put<HxCreatorPublish>(`/api/v1/creator/publishes/${id}`, data);
}

export async function deleteHxCreatorPublishApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/creator/publishes/${id}`);
}
