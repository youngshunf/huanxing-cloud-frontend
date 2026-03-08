import { requestClient } from '#/api/request';

/**
 * 竞品账号表 API
 */

// Types
export interface HxCreatorCompetitor {
  project_id: number;
  user_id: number;
  name: string;
  platform: string;
  url?: string;
  follower_count?: number;
  avg_likes?: number;
  content_style?: string;
  strengths?: string;
  notes?: string;
  tags?: Record<string, any>;
  last_analyzed?: string;
}

export interface HxCreatorCompetitorParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  name?: string;
  last_analyzed?: string;
}

export interface HxCreatorCompetitorCreateParams {
  project_id: number;
  user_id: number;
  name: string;
  platform: string;
  url?: string;
  follower_count?: number;
  avg_likes?: number;
  content_style?: string;
  strengths?: string;
  notes?: string;
  tags?: Record<string, any>;
  last_analyzed?: string;
}

export interface HxCreatorCompetitorListResult {
  items: HxCreatorCompetitor[];
  total: number;
}

// API functions
export async function getHxCreatorCompetitorListApi(params: HxCreatorCompetitorParams): Promise<HxCreatorCompetitorListResult> {
  return requestClient.get<HxCreatorCompetitorListResult>('/api/v1/creator/competitors', { params });
}

export async function getHxCreatorCompetitorApi(id: number): Promise<HxCreatorCompetitor> {
  return requestClient.get<HxCreatorCompetitor>(`/api/v1/creator/competitors/${id}`);
}

export async function createHxCreatorCompetitorApi(data: HxCreatorCompetitorCreateParams): Promise<HxCreatorCompetitor> {
  return requestClient.post<HxCreatorCompetitor>('/api/v1/creator/competitors', data);
}

export async function updateHxCreatorCompetitorApi(id: number, data: Partial<HxCreatorCompetitorCreateParams>): Promise<HxCreatorCompetitor> {
  return requestClient.put<HxCreatorCompetitor>(`/api/v1/creator/competitors/${id}`, data);
}

export async function deleteHxCreatorCompetitorApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/creator/competitors/${id}`);
}
