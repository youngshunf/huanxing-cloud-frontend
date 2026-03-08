import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HxCreatorHotTopic } from '#/api/creator/hx_creator_hot_topic';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'platform_id',
    label: '平台标识',
    componentProps: {"placeholder": "Search by \u5e73\u53f0\u6807\u8bc6"},
  },
  {
    component: 'Input',
    fieldName: 'platform_name',
    label: '平台名称',
    componentProps: {"placeholder": "Search by \u5e73\u53f0\u540d\u79f0"},
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '热点标题',
    componentProps: {"placeholder": "Search by \u70ed\u70b9\u6807\u9898"},
  },
  {
    component: 'RangePicker',
    fieldName: 'fetched_at',
    label: '抓取时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HxCreatorHotTopic>,
): VxeGridProps['columns'] {
  return [
    {
      field: 'seq',
      title: $t('common.table.id'),
      type: 'seq',
      fixed: 'left',
      width: 50,
    },
    {
      field: 'platform_id',
      title: '平台标识',
      width: 150,
    },
    {
      field: 'platform_name',
      title: '平台名称',
      width: 150,
    },
    {
      field: 'title',
      title: '热点标题',
      width: 150,
    },
    {
      field: 'rank',
      title: '排名',
      width: 150,
    },
    {
      field: 'heat_score',
      title: '热度分数',
      width: 150,
    },
    {
      field: 'fetch_source',
      title: '数据来源',
      width: 150,
    },
    {
      field: 'fetched_at',
      title: '抓取时间',
      width: 150,
    },
    {
      field: 'batch_date',
      title: '批次日期',
      width: 150,
    },
    {
      field: 'operation',
      title: $t('common.table.operation'),
      align: 'center',
      fixed: 'right',
      width: 150,
      cellRender: {
        attrs: {
          nameField: 'id',
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: ['edit', 'delete'],
      },
    },
  ];
}

/**
 * Form schema for add/edit
 */
export const formSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'platform_id',
    label: '平台标识',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'platform_name',
    label: '平台名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '热点标题',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'url',
    label: '热点链接',
    componentProps: {"rows": 4},
  },
  {
    component: 'InputNumber',
    fieldName: 'rank',
    label: '排名',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'heat_score',
    label: '热度分数',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'fetch_source',
    label: '数据来源',
    rules: 'required',
  },
  {
    component: 'DatePicker',
    fieldName: 'fetched_at',
    label: '抓取时间',
    rules: 'required',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'Input',
    fieldName: 'batch_date',
    label: '批次日期',
    rules: 'required',
  },
];
