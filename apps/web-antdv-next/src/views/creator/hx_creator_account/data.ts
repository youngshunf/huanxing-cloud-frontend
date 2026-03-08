import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HxCreatorAccount } from '#/api/creator/hx_creator_account';

import { $t } from '@vben/locales';

import { getDictOptions } from '#/utils/dict';

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
    fieldName: 'platform_uid',
    label: '平台用户ID',
    componentProps: {"placeholder": "Search by \u5e73\u53f0\u7528\u6237ID"},
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: '平台昵称',
    componentProps: {"placeholder": "Search by \u5e73\u53f0\u6635\u79f0"},
  },
  {
    component: 'RangePicker',
    fieldName: 'metrics_updated_at',
    label: '指标更新时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
  {
    component: 'Select',
    fieldName: 'auth_status',
    label: '登录状态',
    componentProps: {
      allowClear: true,
      options: getDictOptions('creator_auth_status'),
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HxCreatorAccount>,
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
      field: 'platform',
      title: '平台标识',
      width: 150,
    },
    {
      field: 'platform_uid',
      title: '平台用户ID',
      width: 150,
    },
    {
      field: 'nickname',
      title: '平台昵称',
      width: 150,
    },
    {
      field: 'followers',
      title: '粉丝数',
      width: 150,
    },
    {
      field: 'following',
      title: '关注数',
      width: 150,
    },
    {
      field: 'total_likes',
      title: '总点赞数',
      width: 150,
    },
    {
      field: 'total_favorites',
      title: '总收藏数',
      width: 150,
    },
    {
      field: 'total_comments',
      title: '总评论数',
      width: 150,
    },
    {
      field: 'total_posts',
      title: '总发布数',
      width: 150,
    },
    {
      field: 'metrics_updated_at',
      title: '指标更新时间',
      width: 150,
    },
    {
      field: 'auth_status',
      title: '登录状态',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('creator_auth_status'),
      },
    },
    {
      field: 'is_primary',
      title: '是否主账号',
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
    fieldName: 'platform',
    label: '平台标识',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'platform_uid',
    label: '平台用户ID',
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: '平台昵称',
  },
  {
    component: 'Textarea',
    fieldName: 'avatar_url',
    label: '头像URL',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'bio',
    label: '平台简介',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'home_url',
    label: '主页链接',
    componentProps: {"rows": 4},
  },
  {
    component: 'InputNumber',
    fieldName: 'followers',
    label: '粉丝数',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'following',
    label: '关注数',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'total_likes',
    label: '总点赞数',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'total_favorites',
    label: '总收藏数',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'total_comments',
    label: '总评论数',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'total_posts',
    label: '总发布数',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Textarea',
    fieldName: 'metrics_json',
    label: '更多指标JSON',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'DatePicker',
    fieldName: 'metrics_updated_at',
    label: '指标更新时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
  {
    component: 'Select',
    fieldName: 'auth_status',
    label: '登录状态',
    componentProps: {
      options: getDictOptions('creator_auth_status'),
    },
  },
  {
    component: 'Switch',
    fieldName: 'is_primary',
    label: '是否主账号',
  },
  {
    component: 'Textarea',
    fieldName: 'notes',
    label: '备注',
    componentProps: {"rows": 4},
  },
];
