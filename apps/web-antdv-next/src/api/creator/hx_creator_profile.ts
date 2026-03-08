import { requestClient } from '#/api/request';

/**
 * 账号画像表 API
 */

// Types
export interface HxCreatorProfile {
  project_id: number;
  user_id: number;
  niche: string;
  sub_niche?: string;
  persona?: string;
  target_audience?: string;
  tone?: string;
  keywords?: Record<string, any>;
  bio?: string;
  content_pillars?: Record<string, any>;
  posting_frequency?: string;
  best_posting_time?: string;
  style_references?: Record<string, any>;
  taboo_topics?: Record<string, any>;
  pillar_weights?: Record<string, any>;
  pillar_weights_updated_at?: string;
}

export interface HxCreatorProfileParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  pillar_weights_updated_at?: string;
}

export interface HxCreatorProfileCreateParams {
  project_id: number;
  user_id: number;
  niche: string;
  sub_niche?: string;
  persona?: string;
  target_audience?: string;
  tone?: string;
  keywords?: Record<string, any>;
  bio?: string;
  content_pillars?: Record<string, any>;
  posting_frequency?: string;
  best_posting_time?: string;
  style_references?: Record<string, any>;
  taboo_topics?: Record<string, any>;
  pillar_weights?: Record<string, any>;
  pillar_weights_updated_at?: string;
}

export interface HxCreatorProfileListResult {
  items: HxCreatorProfile[];
  total: number;
}

// API functions
export async function getHxCreatorProfileListApi(params: HxCreatorProfileParams): Promise<HxCreatorProfileListResult> {
  return requestClient.get<HxCreatorProfileListResult>('/api/v1/creator/profiles', { params });
}

export async function getHxCreatorProfileApi(id: number): Promise<HxCreatorProfile> {
  return requestClient.get<HxCreatorProfile>(`/api/v1/creator/profiles/${id}`);
}

export async function createHxCreatorProfileApi(data: HxCreatorProfileCreateParams): Promise<HxCreatorProfile> {
  return requestClient.post<HxCreatorProfile>('/api/v1/creator/profiles', data);
}

export async function updateHxCreatorProfileApi(id: number, data: Partial<HxCreatorProfileCreateParams>): Promise<HxCreatorProfile> {
  return requestClient.put<HxCreatorProfile>(`/api/v1/creator/profiles/${id}`, data);
}

export async function deleteHxCreatorProfileApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/creator/profiles/${id}`);
}
