import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HxCreatorDraft } from '#/api/creator/hx_creator_draft';

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
    fieldName: 'title',
    label: '标题',
    componentProps: {"placeholder": "Search by \u6807\u9898"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HxCreatorDraft>,
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
      title: '标题',
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
    label: '标题',
  },
  {
    component: 'Textarea',
    fieldName: 'content',
    label: '内容',
    rules: 'required',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'media',
    label: '媒体文件JSON数组',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'tags',
    label: '标签JSON数组',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'target_platforms',
    label: '目标平台JSON数组',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'metadata',
    label: '扩展信息JSON',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
];
