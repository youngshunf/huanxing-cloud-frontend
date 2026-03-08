<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { PayContract } from '#/api/pay/contract';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getPayContractListApi } from '#/api/pay/contract';
import { querySchema, useColumns } from './data';

const formOptions: VbenFormProps = {
  collapsed: true, showCollapseButton: true,
  submitButtonOptions: { content: '查询' },
  schema: querySchema,
};

const gridOptions: VxeTableGridOptions<PayContract> = {
  rowConfig: { keyField: 'id' }, height: 'auto',
  toolbarConfig: { refresh: true, custom: true, zoom: true },
  columns: useColumns(),
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => await getPayContractListApi({ page: page.currentPage, size: page.pageSize, ...formValues }),
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
