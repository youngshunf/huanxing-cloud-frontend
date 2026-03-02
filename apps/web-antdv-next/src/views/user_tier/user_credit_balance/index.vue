<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';
import type {
  OnActionClickParams,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';
import type { UserCreditBalance, UserCreditBalanceParams, GrantCreditsParams } from '#/api/user_tier/user_credit_balance';

import { ref } from 'vue';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getUserCreditBalanceListApi,
  updateUserCreditBalanceApi,
  deleteUserCreditBalanceApi,
  grantCreditsApi,
} from '#/api/user_tier/user_credit_balance';
import { querySchema, useColumns, grantFormSchema, formSchema } from './data';

defineOptions({
  name: 'UserCreditBalance',
});

/**
 * Grid configuration
 */
const formOptions: VbenFormProps = {
  collapsed: true,
  showCollapseButton: true,
  submitButtonOptions: {
    content: $t('common.form.query'),
  },
  schema: querySchema,
};

const gridOptions: VxeTableGridOptions<UserCreditBalance> = {
  rowConfig: {
    keyField: 'id',
  },
  checkboxConfig: {
    highlight: true,
  },
  height: 'auto',
  exportConfig: {},
  printConfig: {},
  toolbarConfig: {
    export: true,
    print: true,
    refresh: true,
    refreshOptions: {
      code: 'query',
    },
    custom: true,
    zoom: true,
  },
  columns: useColumns(onActionClick),
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getUserCreditBalanceListApi({
          page: page.currentPage,
          size: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

function onRefresh() {
  gridApi.query();
}

function onActionClick({ code, row }: OnActionClickParams<UserCreditBalance>) {
  switch (code) {
    case 'delete': {
      deleteUserCreditBalanceApi(row.id).then(() => {
        message.success($t('ui.actionMessage.deleteSuccess', [row.id]));
        onRefresh();
      });
      break;
    }
    case 'edit': {
      editId.value = row.id;
      editModalApi.setData(row).open();
      break;
    }
  }
}

/**
 * Edit Modal
 */
const editId = ref<number>(0);

const [EditForm, editFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: formSchema,
});

const [editModal, editModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await editFormApi.validate();
    if (valid) {
      editModalApi.lock();
      const data = await editFormApi.getValues<UserCreditBalanceParams>();
      try {
        await updateUserCreditBalanceApi(editId.value, data);
        message.success($t('ui.actionMessage.operationSuccess'));
        await editModalApi.close();
        onRefresh();
      } finally {
        editModalApi.unlock();
      }
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const data = editModalApi.getData<UserCreditBalance>();
      editFormApi.resetForm();
      if (data) {
        editFormApi.setValues(data);
      }
    }
  },
});

/**
 * Grant Credits Modal
 */
const [GrantForm, grantFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: grantFormSchema,
});

const grantLoading = ref(false);

const [grantModal, grantModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await grantFormApi.validate();
    if (valid) {
      grantModalApi.lock();
      grantLoading.value = true;
      const data = await grantFormApi.getValues<GrantCreditsParams>();
      try {
        const res = await grantCreditsApi(data) as any;
        const result = res?.data || res;
        const msg = `赠送完成：成功 ${result.success_count} 人，共 ${result.total_credits} 积分${result.failed_count > 0 ? `，失败 ${result.failed_count} 人` : ''}`;
        message.success(msg);
        await grantModalApi.close();
        onRefresh();
      } catch (err: any) {
        message.error(`赠送失败：${err?.message || '未知错误'}`);
      } finally {
        grantModalApi.unlock();
        grantLoading.value = false;
      }
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      grantFormApi.resetForm();
    }
  },
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <VbenButton variant="default" @click="() => grantModalApi.open()">
          🎁 赠送积分
        </VbenButton>
      </template>
    </Grid>
    <editModal :title="'编辑'" :fullscreen-button="false" class="w-[800px]">
      <EditForm />
    </editModal>
    <grantModal :title="'赠送积分'" :fullscreen-button="false" class="w-[600px]">
      <GrantForm />
    </grantModal>
  </Page>
</template>
