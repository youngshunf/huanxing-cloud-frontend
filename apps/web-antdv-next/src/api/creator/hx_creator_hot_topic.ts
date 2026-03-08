import { requestClient } from '#/api/request';

/**
 * 热榜快照表 API
 */

// Types
export interface HxCreatorHotTopic {
  platform_id: string;
  platform_name: string;
  title: string;
  url?: string;
  rank?: number;
  heat_score?: number;
  fetch_source: string;
  fetched_at: string;
  batch_date: string;
}

export interface HxCreatorHotTopicParams {
  page?: number;
  size?: number;
  platform_id?: string;
  platform_name?: string;
  title?: string;
  fetched_at?: string;
}

export interface HxCreatorHotTopicCreateParams {
  platform_id: string;
  platform_name: string;
  title: string;
  url?: string;
  rank?: number;
  heat_score?: number;
  fetch_source: string;
  fetched_at: string;
  batch_date: string;
}

export interface HxCreatorHotTopicListResult {
  items: HxCreatorHotTopic[];
  total: number;
}

// API functions
export async function getHxCreatorHotTopicListApi(params: HxCreatorHotTopicParams): Promise<HxCreatorHotTopicListResult> {
  return requestClient.get<HxCreatorHotTopicListResult>('/api/v1/creator/hot-topics', { params });
}

export async function getHxCreatorHotTopicApi(id: number): Promise<HxCreatorHotTopic> {
  return requestClient.get<HxCreatorHotTopic>(`/api/v1/creator/hot-topics/${id}`);
}

export async function createHxCreatorHotTopicApi(data: HxCreatorHotTopicCreateParams): Promise<HxCreatorHotTopic> {
  return requestClient.post<HxCreatorHotTopic>('/api/v1/creator/hot-topics', data);
}

export async function updateHxCreatorHotTopicApi(id: number, data: Partial<HxCreatorHotTopicCreateParams>): Promise<HxCreatorHotTopic> {
  return requestClient.put<HxCreatorHotTopic>(`/api/v1/creator/hot-topics/${id}`, data);
}

export async function deleteHxCreatorHotTopicApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/creator/hot-topics/${id}`);
}
