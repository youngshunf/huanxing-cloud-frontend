import type { VbenFormSchema } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { PayContract } from '#/api/pay/contract';

const CONTRACT_STATUS = [
  { label: '签约中', value: 0, color: 'default' },
  { label: '已签约', value: 1, color: 'green' },
  { label: '已解约', value: 2, color: 'red' },
  { label: '签约失败', value: 3, color: 'orange' },
];

const TIER_OPTIONS = [
  { label: '星芒', value: 'star_glow', color: 'blue' },
  { label: '星辰', value: 'star_shine', color: 'purple' },
  { label: '星耀', value: 'star_glory', color: 'gold' },
];

const CYCLE_OPTIONS = [
  { label: '月付', value: 'monthly' },
  { label: '年付', value: 'yearly' },
];

export const querySchema: VbenFormSchema[] = [
  { component: 'InputNumber', fieldName: 'user_id', label: '用户ID', componentProps: { style: 'width: 100%' } },
  { component: 'Select', fieldName: 'status', label: '状态', componentProps: { allowClear: true, options: CONTRACT_STATUS } },
];

export function useColumns(): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: '#', type: 'seq', width: 50 },
    { field: 'user_id', title: '用户ID', width: 80 },
    { field: 'contract_no', title: '签约协议号', width: 200 },
    { field: 'tier', title: '套餐', width: 80, cellRender: { name: 'CellTag', options: TIER_OPTIONS } },
    { field: 'billing_cycle', title: '周期', width: 80, cellRender: { name: 'CellTag', options: CYCLE_OPTIONS } },
    { field: 'channel_code', title: '渠道', width: 120 },
    {
      field: 'deduct_amount', title: '扣款金额', width: 100, align: 'right',
      formatter({ cellValue }) { return `¥${(cellValue / 100).toFixed(2)}`; },
    },
    { field: 'status', title: '状态', width: 90, cellRender: { name: 'CellTag', options: CONTRACT_STATUS } },
    { field: 'next_deduct_date', title: '下次扣款', width: 120 },
    { field: 'deduct_count', title: '累计扣款', width: 80 },
    { field: 'signed_time', title: '签约时间', width: 160 },
    { field: 'created_time', title: '创建时间', width: 160 },
  ];
}
