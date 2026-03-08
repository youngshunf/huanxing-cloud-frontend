import { requestClient } from '#/api/request';

/**
 * 内容阶段产出表 API
 */

// Types
export interface HxCreatorContentStage {
  content_id: number;
  user_id: number;
  stage: string;
  content_text?: string;
  file_url?: string;
  status?: string;
  version?: number;
  source_type?: string;
  metadata?: Record<string, any>;
}

export interface HxCreatorContentStageParams {
  page?: number;
  size?: number;
  content_id?: number;
  user_id?: number;
  status?: string;
  source_type?: string;
}

export interface HxCreatorContentStageCreateParams {
  content_id: number;
  user_id: number;
  stage: string;
  content_text?: string;
  file_url?: string;
  status?: string;
  version?: number;
  source_type?: string;
  metadata?: Record<string, any>;
}

export interface HxCreatorContentStageListResult {
  items: HxCreatorContentStage[];
  total: number;
}

// API functions
export async function getHxCreatorContentStageListApi(params: HxCreatorContentStageParams): Promise<HxCreatorContentStageListResult> {
  return requestClient.get<HxCreatorContentStageListResult>('/api/v1/creator/content-stages', { params });
}

export async function getHxCreatorContentStageApi(id: number): Promise<HxCreatorContentStage> {
  return requestClient.get<HxCreatorContentStage>(`/api/v1/creator/content-stages/${id}`);
}

export async function createHxCreatorContentStageApi(data: HxCreatorContentStageCreateParams): Promise<HxCreatorContentStage> {
  return requestClient.post<HxCreatorContentStage>('/api/v1/creator/content-stages', data);
}

export async function updateHxCreatorContentStageApi(id: number, data: Partial<HxCreatorContentStageCreateParams>): Promise<HxCreatorContentStage> {
  return requestClient.put<HxCreatorContentStage>(`/api/v1/creator/content-stages/${id}`, data);
}

export async function deleteHxCreatorContentStageApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/creator/content-stages/${id}`);
}
