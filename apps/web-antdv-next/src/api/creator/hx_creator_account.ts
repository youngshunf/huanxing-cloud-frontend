import { requestClient } from '#/api/request';

/**
 * 平台账号表 API
 */

// Types
export interface HxCreatorAccount {
  project_id: number;
  user_id: number;
  platform: string;
  platform_uid?: string;
  nickname?: string;
  avatar_url?: string;
  bio?: string;
  home_url?: string;
  followers?: number;
  following?: number;
  total_likes?: number;
  total_favorites?: number;
  total_comments?: number;
  total_posts?: number;
  metrics_json?: Record<string, any>;
  metrics_updated_at?: string;
  auth_status?: string;
  is_primary?: boolean;
  notes?: string;
}

export interface HxCreatorAccountParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  platform_uid?: string;
  nickname?: string;
  metrics_updated_at?: string;
  auth_status?: string;
}

export interface HxCreatorAccountCreateParams {
  project_id: number;
  user_id: number;
  platform: string;
  platform_uid?: string;
  nickname?: string;
  avatar_url?: string;
  bio?: string;
  home_url?: string;
  followers?: number;
  following?: number;
  total_likes?: number;
  total_favorites?: number;
  total_comments?: number;
  total_posts?: number;
  metrics_json?: Record<string, any>;
  metrics_updated_at?: string;
  auth_status?: string;
  is_primary?: boolean;
  notes?: string;
}

export interface HxCreatorAccountListResult {
  items: HxCreatorAccount[];
  total: number;
}

// API functions
export async function getHxCreatorAccountListApi(params: HxCreatorAccountParams): Promise<HxCreatorAccountListResult> {
  return requestClient.get<HxCreatorAccountListResult>('/api/v1/creator/accounts', { params });
}

export async function getHxCreatorAccountApi(id: number): Promise<HxCreatorAccount> {
  return requestClient.get<HxCreatorAccount>(`/api/v1/creator/accounts/${id}`);
}

export async function createHxCreatorAccountApi(data: HxCreatorAccountCreateParams): Promise<HxCreatorAccount> {
  return requestClient.post<HxCreatorAccount>('/api/v1/creator/accounts', data);
}

export async function updateHxCreatorAccountApi(id: number, data: Partial<HxCreatorAccountCreateParams>): Promise<HxCreatorAccount> {
  return requestClient.put<HxCreatorAccount>(`/api/v1/creator/accounts/${id}`, data);
}

export async function deleteHxCreatorAccountApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/creator/accounts/${id}`);
}
