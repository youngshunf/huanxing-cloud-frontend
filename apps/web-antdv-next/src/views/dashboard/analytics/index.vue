<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { computed, onMounted, ref, watch } from 'vue';

import { AnalysisChartCard } from '@vben/common-ui';
import { EchartsUI, useEcharts } from '@vben/plugins/echarts';
import { Card, Col, Row, Statistic } from 'antdv-next';

import {
  getAnalyticsApi,
  type AnalyticsData,
} from '#/api/huanxing/analytics';

// ==================== 状态 ====================
const loading = ref(true);
const days = ref(30);
const data = ref<AnalyticsData | null>(null);

// ==================== 图表 refs ====================
const trendChartRef = ref<EchartsUIType>();
const modelPieRef = ref<EchartsUIType>();
const tierPieRef = ref<EchartsUIType>();
const tokenBarRef = ref<EchartsUIType>();

const { renderEcharts: renderTrend } = useEcharts(trendChartRef);
const { renderEcharts: renderModelPie } = useEcharts(modelPieRef);
const { renderEcharts: renderTierPie } = useEcharts(tierPieRef);
const { renderEcharts: renderTokenBar } = useEcharts(tokenBarRef);

// ==================== 格式化 ====================
function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n % 1 === 0 ? `${n}` : n.toFixed(1);
}

function shortModelName(name: string): string {
  return name
    .replace('claude-sonnet-4-5-20250929', 'Sonnet 4.5')
    .replace('claude-haiku-4-5-20251001', 'Haiku 4.5')
    .replace('claude-opus-4-5-20251101', 'Opus 4.5')
    .replace('claude-sonnet-4-5-thinking', 'Sonnet Thinking')
    .replace('claude-opus-4-5-thinking', 'Opus Thinking')
    .replace('claude-sonnet-4-5', 'Sonnet 4.5')
    .replace('claude-haiku-4.5', 'Haiku 4.5')
    .replace('claude-sonnet-4.5', 'Sonnet 4.5')
    .replace('text-embedding-v4', 'Embedding v4')
    .replace('deepseek-v3.2', 'DeepSeek v3.2');
}

// ==================== 概览卡片 ====================
const overviewCards = computed(() => {
  if (!data.value) return [];
  const o = data.value.overview;
  return [
    {
      title: '👥 用户总数',
      value: o.total_users,
      suffix: '人',
      sub: `今日新增 ${o.new_users_today} 人`,
    },
    {
      title: '⚡ 积分消耗',
      value: Math.round(o.period_usage_credits),
      suffix: '',
      sub: `累计 ${formatNumber(o.total_usage_credits)}`,
    },
    {
      title: '🚀 API 调用',
      value: o.period_api_calls,
      suffix: '次',
      sub: `累计 ${formatNumber(o.total_api_calls)} 次`,
    },
    {
      title: '💎 充值积分',
      value: Math.round(o.period_income_credits),
      suffix: '',
      sub: `累计 ${formatNumber(o.total_income_credits)}`,
    },
  ];
});

// ==================== 时间范围切换 ====================
const dayOptions = [
  { label: '近 7 天', value: 7 },
  { label: '近 30 天', value: 30 },
  { label: '近 90 天', value: 90 },
];

function switchDays(d: number) {
  days.value = d;
}

// ==================== 加载数据 ====================
async function loadData() {
  loading.value = true;
  try {
    const res = await getAnalyticsApi(days.value);
    data.value = res;
    renderCharts();
  } catch (e) {
    console.error('加载分析数据失败', e);
  } finally {
    loading.value = false;
  }
}

// ==================== 渲染图表 ====================
function renderCharts() {
  if (!data.value) return;
  const { trends, model_distribution, tier_distribution, token_ranking } =
    data.value;

  // ---- 趋势图 ----
  const shortDates = trends.dates.map((d: string) => d.slice(5));
  renderTrend({
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['API 调用', '积分消耗', 'Token 消耗'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: shortDates,
      axisTick: { show: false },
    },
    yAxis: [
      { type: 'value', name: '次数/积分', splitArea: { show: true } },
      { type: 'value', name: 'Tokens' },
    ],
    series: [
      {
        name: 'API 调用',
        type: 'line',
        smooth: true,
        data: trends.api_calls,
        itemStyle: { color: '#5470c6' },
        areaStyle: { color: 'rgba(84,112,198,0.15)' },
      },
      {
        name: '积分消耗',
        type: 'line',
        smooth: true,
        data: trends.credit_usage,
        itemStyle: { color: '#fac858' },
        areaStyle: { color: 'rgba(250,200,88,0.1)' },
      },
      {
        name: 'Token 消耗',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: trends.token_usage,
        itemStyle: { color: '#91cc75' },
        lineStyle: { type: 'dashed' },
      },
    ],
  });

  // ---- 模型分布饼图 ----
  renderModelPie({
    tooltip: { trigger: 'item', formatter: '{b}: {c} 次 ({d}%)' },
    legend: { bottom: 0, left: 'center', type: 'scroll' },
    series: [
      {
        name: '模型调用',
        type: 'pie',
        radius: ['35%', '60%'],
        avoidLabelOverlap: false,
        label: { show: false, position: 'center' },
        emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
        labelLine: { show: false },
        data: model_distribution.map((m: any) => ({
          name: shortModelName(m.name),
          value: m.value,
        })),
        color: [
          '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
          '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#48b8d0',
        ],
      },
    ],
  });

  // ---- 订阅分布饼图 ----
  renderTierPie({
    tooltip: { trigger: 'item', formatter: '{b}: {c} 人 ({d}%)' },
    legend: { bottom: 0, left: 'center' },
    series: [
      {
        name: '订阅分布',
        type: 'pie',
        radius: '60%',
        roseType: 'radius',
        data: tier_distribution,
        color: ['#91cc75', '#5470c6', '#fac858', '#ee6666', '#73c0de'],
        animationType: 'scale',
        animationEasing: 'exponentialInOut',
      },
    ],
  });

  // ---- Token 排行柱图 ----
  renderTokenBar({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['输入 Token', '输出 Token'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: token_ranking.map((t: any) => shortModelName(t.model)),
      axisLabel: { rotate: 30, fontSize: 11 },
    },
    yAxis: { type: 'value', name: 'Tokens' },
    series: [
      {
        name: '输入 Token',
        type: 'bar',
        stack: 'total',
        data: token_ranking.map((t: any) => t.input_tokens),
        itemStyle: { color: '#5470c6' },
      },
      {
        name: '输出 Token',
        type: 'bar',
        stack: 'total',
        data: token_ranking.map((t: any) => t.output_tokens),
        itemStyle: { color: '#91cc75' },
      },
    ],
  });
}

watch(days, () => loadData());
onMounted(() => loadData());
</script>

<template>
  <div class="p-5">
    <!-- 标题 + 时间范围 -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold">数据分析</h2>
      <div class="flex gap-1">
        <button
          v-for="opt in dayOptions"
          :key="opt.value"
          class="rounded-md px-3 py-1 text-sm transition-colors"
          :class="
            days === opt.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-accent'
          "
          @click="switchDays(opt.value)"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <!-- 概览卡片 -->
    <Row v-if="data" :gutter="16">
      <Col v-for="(card, idx) in overviewCards" :key="idx" :xs="24" :sm="12" :xl="6">
        <Card class="mb-4">
          <Statistic :title="card.title" :value="card.value" :suffix="card.suffix" />
          <div class="mt-2 text-xs text-gray-400">{{ card.sub }}</div>
        </Card>
      </Col>
    </Row>

    <!-- 加载占位 -->
    <div v-if="loading && !data" class="flex items-center justify-center py-20">
      <span class="text-gray-400">加载中...</span>
    </div>

    <!-- 趋势图 -->
    <AnalysisChartCard v-if="data" class="mt-1" title="使用趋势">
      <EchartsUI ref="trendChartRef" :height="350" />
    </AnalysisChartCard>

    <!-- 底部三图 -->
    <div v-if="data" class="mt-5 w-full md:flex">
      <AnalysisChartCard class="mt-5 md:mr-4 md:mt-0 md:w-1/3" title="模型调用分布">
        <EchartsUI ref="modelPieRef" :height="300" />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mr-4 md:mt-0 md:w-1/3" title="订阅等级分布">
        <EchartsUI ref="tierPieRef" :height="300" />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mt-0 md:w-1/3" title="Token 消耗排行">
        <EchartsUI ref="tokenBarRef" :height="300" />
      </AnalysisChartCard>
    </div>
  </div>
</template>
