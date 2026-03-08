import { requestClient } from '#/api/request';

/**
 * 爆款模式库表 API
 */

// Types
export interface HxCreatorViralPattern {
  project_id?: number;
  user_id?: number;
  platform?: string;
  category: string;
  name: string;
  description?: string;
  template?: string;
  examples?: Record<string, any>;
  source?: string;
  usage_count?: number;
  success_rate?: number;
  tags?: Record<string, any>;
}

export interface HxCreatorViralPatternParams {
  page?: number;
  size?: number;
  project_id?: number;
  user_id?: number;
  category?: string;
  name?: string;
}

export interface HxCreatorViralPatternCreateParams {
  project_id?: number;
  user_id?: number;
  platform?: string;
  category: string;
  name: string;
  description?: string;
  template?: string;
  examples?: Record<string, any>;
  source?: string;
  usage_count?: number;
  success_rate?: number;
  tags?: Record<string, any>;
}

export interface HxCreatorViralPatternListResult {
  items: HxCreatorViralPattern[];
  total: number;
}

// API functions
export async function getHxCreatorViralPatternListApi(params: HxCreatorViralPatternParams): Promise<HxCreatorViralPatternListResult> {
  return requestClient.get<HxCreatorViralPatternListResult>('/api/v1/creator/viral-patterns', { params });
}

export async function getHxCreatorViralPatternApi(id: number): Promise<HxCreatorViralPattern> {
  return requestClient.get<HxCreatorViralPattern>(`/api/v1/creator/viral-patterns/${id}`);
}

export async function createHxCreatorViralPatternApi(data: HxCreatorViralPatternCreateParams): Promise<HxCreatorViralPattern> {
  return requestClient.post<HxCreatorViralPattern>('/api/v1/creator/viral-patterns', data);
}

export async function updateHxCreatorViralPatternApi(id: number, data: Partial<HxCreatorViralPatternCreateParams>): Promise<HxCreatorViralPattern> {
  return requestClient.put<HxCreatorViralPattern>(`/api/v1/creator/viral-patterns/${id}`, data);
}

export async function deleteHxCreatorViralPatternApi(id: number): Promise<void> {
  return requestClient.delete<void>(`/api/v1/creator/viral-patterns/${id}`);
}
