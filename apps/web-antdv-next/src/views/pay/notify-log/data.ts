import type { VbenFormSchema } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { PayNotifyLog } from '#/api/pay/notify-log';

const LOG_STATUS = [
  { label: '待处理', value: 0, color: 'default' },
  { label: '成功', value: 1, color: 'green' },
  { label: '失败', value: 2, color: 'red' },
];

const NOTIFY_TYPE = [
  { label: '支付', value: 'pay', color: 'blue' },
  { label: '退款', value: 'refund', color: 'orange' },
  { label: '签约', value: 'contract', color: 'purple' },
];

export const querySchema: VbenFormSchema[] = [
  { component: 'Input', fieldName: 'order_no', label: '订单号' },
  { component: 'Input', fieldName: 'channel_code', label: '渠道编码' },
];

export function useColumns(): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: '#', type: 'seq', width: 50 },
    { field: 'notify_type', title: '类型', width: 80, cellRender: { name: 'CellTag', options: NOTIFY_TYPE } },
    { field: 'order_no', title: '订单号', width: 180 },
    { field: 'channel_code', title: '渠道', width: 120 },
    { field: 'status', title: '状态', width: 80, cellRender: { name: 'CellTag', options: LOG_STATUS } },
    { field: 'error_msg', title: '错误信息', width: 250, showOverflow: true },
    { field: 'notify_data', title: '回调数据', width: 300, showOverflow: true },
    { field: 'created_time', title: '时间', width: 160 },
  ];
}
