import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HxCreatorMedia } from '#/api/creator/hx_creator_media';

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
    fieldName: 'type',
    label: '类型',
    componentProps: {
      allowClear: true,
      options: getDictOptions('creator_type'),
    },
  },
  {
    component: 'Input',
    fieldName: 'filename',
    label: '文件名',
    componentProps: {"placeholder": "Search by \u6587\u4ef6\u540d"},
  },
  {
    component: 'InputNumber',
    fieldName: 'width',
    label: '宽度',
    componentProps: {"style": "width: 100%"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HxCreatorMedia>,
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
      field: 'type',
      title: '类型',
      width: 150,
      cellRender: {
        name: 'CellTag',
        options: getDictOptions('creator_type'),
      },
    },
    {
      field: 'filename',
      title: '文件名',
      width: 150,
    },
    {
      field: 'size',
      title: '文件大小',
      width: 150,
    },
    {
      field: 'width',
      title: '宽度',
      width: 150,
    },
    {
      field: 'height',
      title: '高度',
      width: 150,
    },
    {
      field: 'duration',
      title: '时长',
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
    component: 'Select',
    fieldName: 'type',
    label: '类型',
    rules: 'required',
    componentProps: {
      options: getDictOptions('creator_type'),
    },
  },
  {
    component: 'Textarea',
    fieldName: 'url',
    label: '文件URL',
    rules: 'required',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'filename',
    label: '文件名',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'size',
    label: '文件大小',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'width',
    label: '宽度',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'height',
    label: '高度',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'duration',
    label: '时长',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Textarea',
    fieldName: 'thumbnail_url',
    label: '缩略图URL',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'tags',
    label: '标签JSON数组',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    label: '描述',
    componentProps: {"rows": 4},
  },
];
