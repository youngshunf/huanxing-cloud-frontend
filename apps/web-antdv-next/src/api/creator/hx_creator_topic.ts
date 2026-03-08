import { requestClient } from '#/api/request';

/**
 * 选题推荐表 API
 */

// Types
export interface HxCreatorTopic {
  project_id: number;
  user_id: number;
  title: string;
  potential_score?: number;
  heat_index?: number;
  reason?: string;
  keywords?: Record<string, any>;
  creative_angles?: Record<string, any>;
  status: number;
  content_id?: number;
  batch_date?: string;
  source_uid?: string;
}

export interface HxCreatorTopicParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  title?: string;
  status?: number;
  content_id?: number;
  source_uid?: string;
}

export interface HxCreatorTopicCreateParams {
  project_id: number;
  user_id: number;
  title: string;
  potential_score?: number;
  heat_index?: number;
  reason?: string;
  keywords?: Record<string, any>;
  creative_angles?: Record<string, any>;
  status: number;
  content_id?: number;
  batch_date?: string;
  source_uid?: string;
}

export interface HxCreatorTopicListResult {
  items: HxCreatorTopic[];
  total: number;
}

// API functions
export async function getHxCreatorTopicListApi(params: HxCreatorTopicParams): Promise<HxCreatorTopicListResult> {
  return requestClient.get<HxCreatorTopicListResult>('/api/v1/creator/topics', { params });
}

export async function getHxCreatorTopicApi(id: number): Promise<HxCreatorTopic> {
  return requestClient.get<HxCreatorTopic>(`/api/v1/creator/topics/${id}`);
}

export async function createHxCreatorTopicApi(data: HxCreatorTopicCreateParams): Promise<HxCreatorTopic> {
  return requestClient.post<HxCreatorTopic>('/api/v1/creator/topics', data);
}

export async function updateHxCreatorTopicApi(id: number, data: Partial<HxCreatorTopicCreateParams>): Promise<HxCreatorTopic> {
  return requestClient.put<HxCreatorTopic>(`/api/v1/creator/topics/${id}`, data);
}

export async function deleteHxCreatorTopicApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/creator/topics/${id}`);
}
