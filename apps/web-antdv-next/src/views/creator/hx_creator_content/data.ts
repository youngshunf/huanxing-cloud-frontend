import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HxCreatorContent } from '#/api/creator/hx_creator_content';

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
    fieldName: 'title',
    label: '内容标题',
    componentProps: {"placeholder": "Search by \u5185\u5bb9\u6807\u9898"},
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
    component: 'InputNumber',
    fieldName: 'viral_pattern_id',
    label: '使用的爆款模式ID',
    componentProps: {"style": "width: 100%"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HxCreatorContent>,
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
      field: 'title',
      title: '内容标题',
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
      field: 'pipeline_mode',
      title: '流水线模式',
      width: 150,
    },
    {
      field: 'content_tracks',
      title: '创作轨道',
      width: 150,
    },
    {
      field: 'viral_pattern_id',
      title: '使用的爆款模式ID',
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
    fieldName: 'title',
    label: '内容标题',
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
    componentProps: {
      options: getDictOptions('creator_status'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'target_platforms',
    label: '目标平台JSON数组',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Input',
    fieldName: 'pipeline_mode',
    label: '流水线模式',
  },
  {
    component: 'Input',
    fieldName: 'content_tracks',
    label: '创作轨道',
  },
  {
    component: 'InputNumber',
    fieldName: 'viral_pattern_id',
    label: '使用的爆款模式ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Textarea',
    fieldName: 'metadata',
    label: '扩展信息JSON',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
];
