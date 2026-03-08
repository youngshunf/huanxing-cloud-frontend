<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';
import type { OnActionClickParams, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { PayMerchant } from '#/api/pay/merchant';

import { ref } from 'vue';
import { Page, useVbenModal, VbenButton } from '@vben/common-ui';
import { MaterialSymbolsAdd } from '@vben/icons';
import { $t } from '@vben/locales';
import { message } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  getPayMerchantListApi,
  createPayMerchantApi,
  updatePayMerchantApi,
  deletePayMerchantApi,
} from '#/api/pay/merchant';
import { querySchema, useColumns, formSchema } from './data';

const formOptions: VbenFormProps = {
  collapsed: true,
  showCollapseButton: true,
  submitButtonOptions: { content: '查询' },
  schema: querySchema,
};

const gridOptions: VxeTableGridOptions<PayMerchant> = {
  rowConfig: { keyField: 'id' },
  height: 'auto',
  toolbarConfig: { refresh: true, custom: true, zoom: true },
  columns: useColumns(onActionClick),
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) =>
        await getPayMerchantListApi({
          page: page.currentPage,
          size: page.pageSize,
          ...formValues,
        }),
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });
const editId = ref(0);

function onRefresh() { gridApi.query(); }

function onActionClick({ code, row }: OnActionClickParams<PayMerchant>) {
  if (code === 'delete') {
    deletePayMerchantApi([row.id]).then(() => {
      message.success('删除成功');
      onRefresh();
    });
  }
  if (code === 'edit') {
    editId.value = row.id;
    editModalApi.setData({ ...row }).open();
  }
}

const [EditForm, editFormApi] = useVbenForm({
  showDefaultActions: false,
  schema: formSchema,
});

const [editModal, editModalApi] = useVbenModal({
  destroyOnClose: true,
  async onConfirm() {
    const { valid } = await editFormApi.validate();
    if (!valid) return;
    editModalApi.lock();

    const values = await editFormApi.getValues();
    const data: Record<string, any> = {};
    const config: Record<string, any> = {};
    for (const [k, v] of Object.entries(values)) {
      if (k.startsWith('config.')) {
        // 扁平 key：config.appId → config['appId']
        const ck = k.slice(7);
        if (v !== undefined && v !== null && v !== '') config[ck] = v;
      } else if (k === 'config' && typeof v === 'object' && v !== null) {
        // Vben 自动嵌套：getValues() 返回 { config: { appId: ... } }
        for (const [ck, cv] of Object.entries(v as Record<string, any>)) {
          if (cv !== undefined && cv !== null && cv !== '') config[ck] = cv;
        }
      } else if (!k.startsWith('_')) {
        data[k] = v;
      }
    }
    data.config = config;

    try {
      if (editId.value) await updatePayMerchantApi(editId.value, data);
      else await createPayMerchantApi(data);
      message.success('操作成功');
      await editModalApi.close();
      onRefresh();
    } finally {
      editModalApi.unlock();
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      editFormApi.resetForm();
      const data = editModalApi.getData<any>();
      if (data) {
        const { config, ...baseFields } = data;
        // 1. 先设 type 等基础字段，让依赖条件（微信/支付宝显隐）生效
        editFormApi.setValues({ type: baseFields.type, status: baseFields.status, name: baseFields.name, remark: baseFields.remark });
        // 2. 等依赖条件渲染完毕，再用 setFieldValue 逐个设 config.xxx
        //    setFieldValue 直接走 vee-validate，正确支持点号嵌套路径
        setTimeout(() => {
          if (config && typeof config === 'object') {
            for (const [k, v] of Object.entries(config)) {
              editFormApi.setFieldValue(`config.${k}`, v);
            }
          }
        }, 150);
      }
    }
  },
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <VbenButton @click="() => { editId = 0; editModalApi.open(); }">
          <MaterialSymbolsAdd class="size-5" />
          新增商户
        </VbenButton>
      </template>
    </Grid>
    <editModal :title="editId ? '编辑商户' : '新增商户'" class="w-[800px]">
      <EditForm />
    </editModal>
  </Page>
</template>
