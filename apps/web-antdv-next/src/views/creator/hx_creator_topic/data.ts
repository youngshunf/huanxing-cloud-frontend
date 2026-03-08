import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HxCreatorTopic } from '#/api/creator/hx_creator_topic';

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
    label: '选题标题',
    componentProps: {"placeholder": "Search by \u9009\u9898\u6807\u9898"},
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
    fieldName: 'content_id',
    label: '采纳后关联的内容ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'source_uid',
    label: '来源标识',
    componentProps: {"placeholder": "Search by \u6765\u6e90\u6807\u8bc6"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HxCreatorTopic>,
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
      title: '选题标题',
      width: 150,
    },
    {
      field: 'potential_score',
      title: '潜力评分',
      width: 150,
    },
    {
      field: 'heat_index',
      title: '热度指数',
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
      field: 'content_id',
      title: '采纳后关联的内容ID',
      width: 150,
    },
    {
      field: 'batch_date',
      title: '批次日期',
      width: 150,
    },
    {
      field: 'source_uid',
      title: '来源标识',
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
    label: '选题标题',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'potential_score',
    label: '潜力评分',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'InputNumber',
    fieldName: 'heat_index',
    label: '热度指数',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Textarea',
    fieldName: 'reason',
    label: '推荐理由',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'keywords',
    label: '关键词JSON数组',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'creative_angles',
    label: '创作角度JSON',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
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
    component: 'InputNumber',
    fieldName: 'content_id',
    label: '采纳后关联的内容ID',
    componentProps: {"style": "width: 100%"},
  },
  {
    component: 'Input',
    fieldName: 'batch_date',
    label: '批次日期',
  },
  {
    component: 'Input',
    fieldName: 'source_uid',
    label: '来源标识',
  },
];
