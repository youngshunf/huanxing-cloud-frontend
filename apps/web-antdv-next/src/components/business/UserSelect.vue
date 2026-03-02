<script setup lang="ts">
/**
 * 用户选择组件
 * 支持搜索（昵称/手机号）、单选和多选模式
 * 远程搜索 + 防抖
 */
import type { SysUserResult } from '#/api/core/user';

import { computed, ref } from 'vue';

import { Select, Spin } from 'antdv-next';

import { getSysUserListApi } from '#/api/core/user';

interface Props {
  value?: number | number[] | null;
  mode?: 'default' | 'multiple';
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  maxTagCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  mode: 'default',
  placeholder: '搜索用户（昵称/手机号）',
  disabled: false,
  allowClear: true,
  maxTagCount: 10,
});

const emit = defineEmits<{
  'update:value': [value: number | number[] | null | undefined];
  change: [value: number | number[] | null | undefined];
}>();

const loading = ref(false);
const searchText = ref('');
const options = ref<{ label: string; value: number; user: SysUserResult }[]>([]);
const selectedCache = ref<Map<number, { label: string; value: number }>>(new Map());

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const innerValue = computed({
  get: () => props.value,
  set: (val) => {
    emit('update:value', val);
    emit('change', val);
  },
});

// 合并选项：搜索结果 + 已选中但不在搜索结果中的（从缓存补充）
const mergedOptions = computed(() => {
  const searchOptions = options.value;
  const searchIds = new Set(searchOptions.map((o) => o.value));
  const extraOptions: typeof searchOptions = [];
  const selectedIds = Array.isArray(innerValue.value)
    ? innerValue.value
    : innerValue.value
      ? [innerValue.value]
      : [];

  for (const id of selectedIds) {
    if (!searchIds.has(id) && selectedCache.value.has(id)) {
      const cached = selectedCache.value.get(id)!;
      extraOptions.push({ ...cached, user: {} as SysUserResult });
    }
  }
  return [...extraOptions, ...searchOptions];
});

async function searchUsers(keyword: string) {
  if (!keyword || keyword.length < 1) {
    options.value = [];
    return;
  }
  loading.value = true;
  try {
    const isPhone = /^\d+$/.test(keyword);
    const params = isPhone
      ? { phone: keyword, size: 20 }
      : { username: keyword, size: 20 };
    const res = await getSysUserListApi(params);
    const items = (res as any).items || res;
    options.value = (Array.isArray(items) ? items : []).map(
      (user: SysUserResult) => {
        const label = `${user.nickname || user.username}（${user.phone || '-'}）`;
        const opt = { label, value: user.id, user };
        selectedCache.value.set(user.id, { label, value: user.id });
        return opt;
      },
    );
  } catch {
    options.value = [];
  } finally {
    loading.value = false;
  }
}

function onSearch(value: string) {
  searchText.value = value;
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => searchUsers(value), 300);
}

async function loadInitial() {
  loading.value = true;
  try {
    const res = await getSysUserListApi({ size: 20 });
    const items = (res as any).items || res;
    options.value = (Array.isArray(items) ? items : []).map(
      (user: SysUserResult) => {
        const label = `${user.nickname || user.username}（${user.phone || '-'}）`;
        selectedCache.value.set(user.id, { label, value: user.id });
        return { label, value: user.id, user };
      },
    );
  } finally {
    loading.value = false;
  }
}

loadInitial();

defineExpose({ reload: loadInitial, selectedCache });
</script>

<template>
  <Select
    v-model:value="innerValue"
    :mode="mode === 'multiple' ? 'multiple' : undefined"
    :placeholder="placeholder"
    :disabled="disabled"
    :allow-clear="allowClear"
    :show-search="true"
    :filter-option="false"
    :options="mergedOptions"
    :loading="loading"
    :max-tag-count="maxTagCount"
    class="w-full"
    @search="onSearch"
  >
    <template #notFoundContent>
      <Spin v-if="loading" size="small" />
      <span v-else>{{ searchText ? '未找到用户' : '请输入搜索关键词' }}</span>
    </template>
  </Select>
</template>
