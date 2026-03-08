import type { VbenFormSchema } from '#/adapter/form';
import type {
  OnActionClickFn,
  VxeGridProps,
} from '#/adapter/vxe-table';
import type { HxCreatorProfile } from '#/api/creator/hx_creator_profile';

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
    component: 'RangePicker',
    fieldName: 'pillar_weights_updated_at',
    label: '支柱权重更新时间',
    componentProps: {"format": "YYYY-MM-DD"},
  },
];

/**
 * Table columns configuration
 */
export function useColumns(
  onActionClick?: OnActionClickFn<HxCreatorProfile>,
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
      field: 'niche',
      title: '赛道/领域',
      width: 150,
    },
    {
      field: 'sub_niche',
      title: '细分赛道',
      width: 150,
    },
    {
      field: 'tone',
      title: '内容调性',
      width: 150,
    },
    {
      field: 'posting_frequency',
      title: '发布频率',
      width: 150,
    },
    {
      field: 'best_posting_time',
      title: '最佳发布时间',
      width: 150,
    },
    {
      field: 'pillar_weights_updated_at',
      title: '支柱权重更新时间',
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
    fieldName: 'niche',
    label: '赛道/领域',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'sub_niche',
    label: '细分赛道',
  },
  {
    component: 'Textarea',
    fieldName: 'persona',
    label: '人设',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'target_audience',
    label: '目标受众描述',
    componentProps: {"rows": 4},
  },
  {
    component: 'Input',
    fieldName: 'tone',
    label: '内容调性',
  },
  {
    component: 'Textarea',
    fieldName: 'keywords',
    label: '核心关键词JSON数组',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'bio',
    label: '简介文案',
    componentProps: {"rows": 4},
  },
  {
    component: 'Textarea',
    fieldName: 'content_pillars',
    label: '内容支柱JSON数组',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Input',
    fieldName: 'posting_frequency',
    label: '发布频率',
  },
  {
    component: 'Input',
    fieldName: 'best_posting_time',
    label: '最佳发布时间',
  },
  {
    component: 'Textarea',
    fieldName: 'style_references',
    label: '风格参考账号JSON数组',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'taboo_topics',
    label: '避免话题JSON数组',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'Textarea',
    fieldName: 'pillar_weights',
    label: '支柱权重JSON',
    componentProps: {"placeholder": "Enter JSON", "rows": 6},
  },
  {
    component: 'DatePicker',
    fieldName: 'pillar_weights_updated_at',
    label: '支柱权重更新时间',
    componentProps: {"format": "YYYY-MM-DD HH:mm:ss", "showTime": true, "valueFormat": "YYYY-MM-DD HH:mm:ss"},
  },
];
