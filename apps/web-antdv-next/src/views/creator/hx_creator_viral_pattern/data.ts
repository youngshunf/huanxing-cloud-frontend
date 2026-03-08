import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HxCreatorViralPattern } from '#/api/creator/hx_creator_viral_pattern';

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
    component: 'Select',
    fieldName: 'category',
    label: '分类',
    componentProps: {
      allowClear: true,
      options: getDictOptions('creator_category'),
    },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '模式名称',
    componentProps: {"placeholder": "Search by \u6a21\u5f0f\u540d\u79f0"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HxCreatorViralPattern>,
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
      title: '适用平台',
      width: 150,
    },
    {
      field: 'category',
      title: '分类',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('creator_category'),
      },
    },
    {
      field: 'name',
      title: '模式名称',
      width: 150,
    },
    {
      field: 'source',
      title: '来源',
      width: 150,
    },
    {
      field: 'usage_count',
      title: '使用次数',
      width: 150,
    },
    {
      field: 'success_rate',
      title: '成功率',
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
    fieldName: 'platform',
    label: '适用平台',
  },
  {
    component: 'Select',
    fieldName: 'category',
    label: '分类',
    rules: 'required',
    componentProps: {
      options: getDictOptions('creator_category'),
    },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '模式名称',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '模式描述',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'template',
    label: '模式模板',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'examples',
    label: '示例JSON数组',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Input',
    fieldName: 'source',
    label: '来源',
  },
  {
    component: 'InputNumber',
    fieldName: 'usage_count',
    label: '使用次数',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'success_rate',
    label: '成功率',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Textarea',
    fieldName: 'tags',
    label: '标签JSON数组',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
];
