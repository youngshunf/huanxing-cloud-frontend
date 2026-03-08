import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HxCreatorCompetitor } from '#/api/creator/hx_creator_competitor';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'project_id',
    label: '关联项目ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '关联用户ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '竞品名称',
    componentProps: {"placeholder": "Search by \u7ade\u54c1\u540d\u79f0"},
  },
  {
    component: 'RangePicker',
    fieldName: 'last_analyzed',
    label: '最后分析时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HxCreatorCompetitor>,
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
      field: 'project_id',
      title: '关联项目ID',
      width: 150,
    },
    {
      field: 'user_id',
      title: '关联用户ID',
      width: 150,
    },
    {
      field: 'name',
      title: '竞品名称',
      width: 150,
    },
    {
      field: 'platform',
      title: '平台',
      width: 150,
    },
    {
      field: 'follower_count',
      title: '粉丝数',
      width: 150,
    },
    {
      field: 'avg_likes',
      title: '平均点赞',
      width: 150,
    },
    {
      field: 'last_analyzed',
      title: '最后分析时间',
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
    component: 'InputNumber',
    fieldName: 'project_id',
    label: '关联项目ID',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '关联用户ID',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '竞品名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'platform',
    label: '平台',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'url',
    label: '主页链接',
    componentProps: {"rows": 4},
  },
  {
    component: 'InputNumber',
    fieldName: 'follower_count',
    label: '粉丝数',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'avg_likes',
    label: '平均点赞',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Textarea',
    fieldName: 'content_style',
    label: '内容风格',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'strengths',
    label: '优势',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'notes',
    label: '备注',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'tags',
    label: '标签JSON数组',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'DatePicker',
    fieldName: 'last_analyzed',
    label: '最后分析时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
];
