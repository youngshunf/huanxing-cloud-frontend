import { requestClient } from '#/api/request';

/**
 * 草稿箱表 API
 */

// Types
export interface HxCreatorDraft {
  project_id: number;
  user_id: number;
  title?: string;
  content: string;
  media?: Record<string, any>;
  tags?: Record<string, any>;
  target_platforms?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface HxCreatorDraftParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  title?: string;
}

export interface HxCreatorDraftCreateParams {
  project_id: number;
  user_id: number;
  title?: string;
  content: string;
  media?: Record<string, any>;
  tags?: Record<string, any>;
  target_platforms?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface HxCreatorDraftListResult {
  items: HxCreatorDraft[];
  total: number;
}

// API functions
export async function getHxCreatorDraftListApi(params: HxCreatorDraftParams): Promise<HxCreatorDraftListResult> {
  return requestClient.get<HxCreatorDraftListResult>('/api/v1/creator/drafts', { params });
}

export async function getHxCreatorDraftApi(id: number): Promise<HxCreatorDraft> {
  return requestClient.get<HxCreatorDraft>(`/api/v1/creator/drafts/${id}`);
}

export async function createHxCreatorDraftApi(data: HxCreatorDraftCreateParams): Promise<HxCreatorDraft> {
  return requestClient.post<HxCreatorDraft>('/api/v1/creator/drafts', data);
}

export async function updateHxCreatorDraftApi(id: number, data: Partial<HxCreatorDraftCreateParams>): Promise<HxCreatorDraft> {
  return requestClient.put<HxCreatorDraft>(`/api/v1/creator/drafts/${id}`, data);
}

export async function deleteHxCreatorDraftApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/creator/drafts/${id}`);
}
