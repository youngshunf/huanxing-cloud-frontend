import { requestClient } from '#/api/request';

/**
 * 素材库表 API
 */

// Types
export interface HxCreatorMedia {
  project_id: number;
  user_id: number;
  type: string;
  url: string;
  filename: string;
  size?: number;
  width?: number;
  height?: number;
  duration?: number;
  thumbnail_url?: string;
  tags?: Record<string, any>;
  description?: string;
}

export interface HxCreatorMediaParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  type?: string;
  filename?: string;
  width?: number;
}

export interface HxCreatorMediaCreateParams {
  project_id: number;
  user_id: number;
  type: string;
  url: string;
  filename: string;
  size?: number;
  width?: number;
  height?: number;
  duration?: number;
  thumbnail_url?: string;
  tags?: Record<string, any>;
  description?: string;
}

export interface HxCreatorMediaListResult {
  items: HxCreatorMedia[];
  total: number;
}

// API functions
export async function getHxCreatorMediaListApi(params: HxCreatorMediaParams): Promise<HxCreatorMediaListResult> {
  return requestClient.get<HxCreatorMediaListResult>('/api/v1/creator/media', { params });
}

export async function getHxCreatorMediaApi(id: number): Promise<HxCreatorMedia> {
  return requestClient.get<HxCreatorMedia>(`/api/v1/creator/media/${id}`);
}

export async function createHxCreatorMediaApi(data: HxCreatorMediaCreateParams): Promise<HxCreatorMedia> {
  return requestClient.post<HxCreatorMedia>('/api/v1/creator/media', data);
}

export async function updateHxCreatorMediaApi(id: number, data: Partial<HxCreatorMediaCreateParams>): Promise<HxCreatorMedia> {
  return requestClient.put<HxCreatorMedia>(`/api/v1/creator/media/${id}`, data);
}

export async function deleteHxCreatorMediaApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/creator/media/${id}`);
}
