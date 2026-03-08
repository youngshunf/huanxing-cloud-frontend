import { requestClient } from '#/api/request';

/**
 * 创作项目表 API
 */

// Types
export interface HxCreatorProject {
  user_id: number;
  name: string;
  description?: string;
  platform: string;
  platforms?: Record<string, any>;
  avatar_url?: string;
  is_active?: boolean;
}

export interface HxCreatorProjectParams {
  page?: number;
  size?: number;
  user_id?: number;
  name?: string;
}

export interface HxCreatorProjectCreateParams {
  user_id: number;
  name: string;
  description?: string;
  platform: string;
  platforms?: Record<string, any>;
  avatar_url?: string;
  is_active?: boolean;
}

export interface HxCreatorProjectListResult {
  items: HxCreatorProject[];
  total: number;
}

// API functions
export async function getHxCreatorProjectListApi(params: HxCreatorProjectParams): Promise<HxCreatorProjectListResult> {
  return requestClient.get<HxCreatorProjectListResult>('/api/v1/creator/projects', { params });
}

export async function getHxCreatorProjectApi(id: number): Promise<HxCreatorProject> {
  return requestClient.get<HxCreatorProject>(`/api/v1/creator/projects/${id}`);
}

export async function createHxCreatorProjectApi(data: HxCreatorProjectCreateParams): Promise<HxCreatorProject> {
  return requestClient.post<HxCreatorProject>('/api/v1/creator/projects', data);
}

export async function updateHxCreatorProjectApi(id: number, data: Partial<HxCreatorProjectCreateParams>): Promise<HxCreatorProject> {
  return requestClient.put<HxCreatorProject>(`/api/v1/creator/projects/${id}`, data);
}

export async function deleteHxCreatorProjectApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/creator/projects/${id}`);
}
