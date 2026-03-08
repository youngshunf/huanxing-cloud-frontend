import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HxCreatorProject } from '#/api/creator/hx_creator_project';

import { $t } from '@vben/locales';

/**
 * Query form schema
 */
export const querySchema: VbenFormSchema[] = [
  {
    component: 'InputNumber',
    fieldName: 'user_id',
    label: '关联用户ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '项目名称',
    componentProps: {"placeholder": "Search by \u9879\u76ee\u540d\u79f0\uff08\u5982\uff1a\u5c0f\u7ea2\u4e66\u7f8e\u98df\u53f7\uff09"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HxCreatorProject>,
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
      field: 'user_id',
      title: '关联用户ID',
      width: 150,
    },
    {
      field: 'name',
      title: '项目名称',
      width: 150,
    },
    {
      field: 'platform',
      title: '主平台',
      width: 150,
    },
    {
      field: 'is_active',
      title: '是否为当前活跃项目',
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
    fieldName: 'user_id',
    label: '关联用户ID',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '项目名称',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '项目描述',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'platform',
    label: '主平台',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'platforms',
    label: '多平台JSON数组',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'avatar_url',
    label: '项目头像URL',
    componentProps: {"rows": 4},
  },
  {
    component: 'Switch',
    fieldName: 'is_active',
    label: '是否为当前活跃项目',
  },
];
