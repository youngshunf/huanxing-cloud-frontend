import { requestClient } from '#/api/request';

// ==================== 类型定义 ====================

export interface AnalyticsOverview {
  total_users: number;
  new_users_today: number;
  total_usage_credits: number;
  period_usage_credits: number;
  total_api_calls: number;
  period_api_calls: number;
  total_income_credits: number;
  period_income_credits: number;
}

export interface AnalyticsTrends {
  dates: string[];
  api_calls: number[];
  credit_usage: number[];
  token_usage: number[];
}

export interface ModelDistributionItem {
  name: string;
  value: number;
}

export interface TierDistributionItem {
  name: string;
  value: number;
}

export interface TokenRankingItem {
  model: string;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  calls: number;
}

export interface AnalyticsData {
  overview: AnalyticsOverview;
  trends: AnalyticsTrends;
  model_distribution: ModelDistributionItem[];
  tier_distribution: TierDistributionItem[];
  token_ranking: TokenRankingItem[];
}

// ==================== API ====================

export async function getAnalyticsApi(days: number = 30) {
  return requestClient.get<AnalyticsData>('/api/v1/huanxing/analytics', {
    params: { days },
  });
}
