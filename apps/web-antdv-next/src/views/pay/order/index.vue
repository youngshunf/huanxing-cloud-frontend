<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { PayOrder } from '#/api/pay/order';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getPayOrderListApi } from '#/api/pay/order';
import { querySchema, useColumns } from './data';

const formOptions: VbenFormProps = {
  collapsed: true, showCollapseButton: true,
  submitButtonOptions: { content: '查询' },
  schema: querySchema,
};

const gridOptions: VxeTableGridOptions<PayOrder> = {
  rowConfig: { keyField: 'id' }, height: 'auto',
  toolbarConfig: { refresh: true, export: true, custom: true, zoom: true },
  exportConfig: {},
  columns: useColumns(),
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => await getPayOrderListApi({ page: page.currentPage, size: page.pageSize, ...formValues }),
    },
  },
};

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });
</script>

<template>
  <Page auto-content-height>
    <Grid />
  </Page>
</template>
