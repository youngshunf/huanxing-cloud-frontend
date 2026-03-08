import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HxCreatorPublish } from '#/api/creator/hx_creator_publish';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'content_id',
    label: '关联内容ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'account_id',
    label: '关联平台账号ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '关联用户ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('creator_status'),
    },
  },
  {
    component: 'RangePicker',
    fieldName: 'published_at',
    label: '发布时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'RangePicker',
    fieldName: 'metrics_updated_at',
    label: '指标更新时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HxCreatorPublish>,
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
      field: 'content_id',
      title: '关联内容ID',
      width: 150,
    },
    {
      field: 'account_id',
      title: '关联平台账号ID',
      width: 150,
    },
    {
      field: 'user_id',
      title: '关联用户ID',
      width: 150,
    },
    {
      field: 'platform',
      title: '发布平台',
      width: 150,
    },
    {
      field: 'status',
      title: '状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('creator_status'),
      },
    },
    {
      field: 'method',
      title: '发布方式',
      width: 150,
    },
    {
      field: 'published_at',
      title: '发布时间',
      width: 150,
    },
    {
      field: 'views',
      title: '阅读量',
      width: 150,
    },
    {
      field: 'likes',
      title: '点赞数',
      width: 150,
    },
    {
      field: 'comments',
      title: '评论数',
      width: 150,
    },
    {
      field: 'shares',
      title: '分享数',
      width: 150,
    },
    {
      field: 'favorites',
      title: '收藏数',
      width: 150,
    },
    {
      field: 'metrics_updated_at',
      title: '指标更新时间',
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
    fieldName: 'content_id',
    label: '关联内容ID',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'account_id',
    label: '关联平台账号ID',
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
    fieldName: 'platform',
    label: '发布平台',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'publish_url',
    label: '发布链接',
    componentProps: {"rows": 4},
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    componentProps: {
      options: getDictOptions('creator_status'),
    },
  },
  {
    component: 'Input',
    fieldName: 'method',
    label: '发布方式',
  },
  {
    component: 'Textarea',
    fieldName: 'error_message',
    label: '错误信息',
    componentProps: {"rows": 4},
  },
  {
    component: 'DatePicker',
    fieldName: 'published_at',
    label: '发布时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'InputNumber',
    fieldName: 'views',
    label: '阅读量',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'likes',
    label: '点赞数',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'comments',
    label: '评论数',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'shares',
    label: '分享数',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'favorites',
    label: '收藏数',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Textarea',
    fieldName: 'metrics_json',
    label: '更多数据指标JSON',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'DatePicker',
    fieldName: 'metrics_updated_at',
    label: '指标更新时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
];
