import { requestClient } from '#/api/request';

/**
 * HASN Agent 表 API
 */

// Types
export interface HasnAgents {
  star_id: string;
  owner_id: string;
  name: string;
  api_key_hash: string;
  api_key_prefix: string;
  openclaw_agent_id?: string;
  description: string;
  role: string;
  capabilities: Record<string, any>;
  profile: Record<string, any>;
  api_endpoint?: string;
  pricing: Record<string, any>;
  reputation_score: number;
  review_count: number;
  total_interactions: number;
  experience_credit_score: number;
  experience_shared_count: number;
  experience_adopted_count: number;
  status: string;
  last_active_at?: string;
}

export interface HasnAgentsParams {
  page?: number;
  size?: number;
  star_id?: string;
  owner_id?: string;
  name?: string;
  openclaw_agent_id?: string;
  status?: string;
  last_active_at?: string;
}

export interface HasnAgentsCreateParams {
  star_id: string;
  owner_id: string;
  name: string;
  api_key_hash: string;
  api_key_prefix: string;
  openclaw_agent_id?: string;
  description: string;
  role: string;
  capabilities: Record<string, any>;
  profile: Record<string, any>;
  api_endpoint?: string;
  pricing: Record<string, any>;
  reputation_score: number;
  review_count: number;
  total_interactions: number;
  experience_credit_score: number;
  experience_shared_count: number;
  experience_adopted_count: number;
  status: string;
  last_active_at?: string;
}

export interface HasnAgentsListResult {
  items: HasnAgents[];
  total: number;
}

// API functions
export async function getHasnAgentsListApi(params: HasnAgentsParams): Promise<HasnAgentsListResult> {
  return requestClient.get<HasnAgentsListResult>('/api/v1/hasn/admin/agents', { params });
}

export async function getHasnAgentsApi(id: number): Promise<HasnAgents> {
  return requestClient.get<HasnAgents>(`/api/v1/hasn/admin/agents/${id}`);
}

export async function createHasnAgentsApi(data: HasnAgentsCreateParams): Promise<HasnAgents> {
  return requestClient.post<HasnAgents>('/api/v1/hasn/admin/agents', data);
}

export async function updateHasnAgentsApi(id: number, data: Partial<HasnAgentsCreateParams>): Promise<HasnAgents> {
  return requestClient.put<HasnAgents>(`/api/v1/hasn/admin/agents/${id}`, data);
}

export async function deleteHasnAgentsApi(id: number): Promise<void> {
  return requestClient.delete<void>('/api/v1/hasn/admin/agents', { data: { pks: [id] } });
}
