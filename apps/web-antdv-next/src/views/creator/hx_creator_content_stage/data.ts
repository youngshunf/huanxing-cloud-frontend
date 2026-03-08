import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HxCreatorContentStage } from '#/api/creator/hx_creator_content_stage';

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
    component: 'Select',
    fieldName: 'source_type',
    label: '来源',
    componentProps: {
      allowClear: true,
      options: getDictOptions('creator_source_type'),
    },
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HxCreatorContentStage>,
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
      field: 'user_id',
      title: '关联用户ID',
      width: 150,
    },
    {
      field: 'stage',
      title: '阶段',
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
      field: 'version',
      title: '版本号',
      width: 150,
    },
    {
      field: 'source_type',
      title: '来源',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('creator_source_type'),
      },
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
    fieldName: 'user_id',
    label: '关联用户ID',
    rules: 'required',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'stage',
    label: '阶段',
    rules: 'required',
  },
  {
    component: 'Textarea',
    fieldName: 'content_text',
    label: '产出内容文本',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'file_url',
    label: '产出文件URL',
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
    component: 'InputNumber',
    fieldName: 'version',
    label: '版本号',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Select',
    fieldName: 'source_type',
    label: '来源',
    componentProps: {
      options: getDictOptions('creator_source_type'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'metadata',
    label: '扩展信息JSON',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
];
