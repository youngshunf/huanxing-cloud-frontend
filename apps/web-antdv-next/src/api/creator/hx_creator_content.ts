import { requestClient } from '#/api/request';

/**
 * 内容创作主表 API
 */

// Types
export interface HxCreatorContent {
  project_id: number;
  user_id: number;
  title?: string;
  status: string;
  target_platforms?: Record<string, any>;
  pipeline_mode?: string;
  content_tracks?: string;
  viral_pattern_id?: number;
  metadata?: Record<string, any>;
}

export interface HxCreatorContentParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  title?: string;
  status?: string;
  viral_pattern_id?: number;
}

export interface HxCreatorContentCreateParams {
  project_id: number;
  user_id: number;
  title?: string;
  status: string;
  target_platforms?: Record<string, any>;
  pipeline_mode?: string;
  content_tracks?: string;
  viral_pattern_id?: number;
  metadata?: Record<string, any>;
}

export interface HxCreatorContentListResult {
  items: HxCreatorContent[];
  total: number;
}

// API functions
export async function getHxCreatorContentListApi(params: HxCreatorContentParams): Promise<HxCreatorContentListResult> {
  return requestClient.get<HxCreatorContentListResult>('/api/v1/creator/contents', { params });
}

export async function getHxCreatorContentApi(id: number): Promise<HxCreatorContent> {
  return requestClient.get<HxCreatorContent>(`/api/v1/creator/contents/${id}`);
}

export async function createHxCreatorContentApi(data: HxCreatorContentCreateParams): Promise<HxCreatorContent> {
  return requestClient.post<HxCreatorContent>('/api/v1/creator/contents', data);
}

export async function updateHxCreatorContentApi(id: number, data: Partial<HxCreatorContentCreateParams>): Promise<HxCreatorContent> {
  return requestClient.put<HxCreatorContent>(`/api/v1/creator/contents/${id}`, data);
}

export async function deleteHxCreatorContentApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/creator/contents/${id}`);
}
