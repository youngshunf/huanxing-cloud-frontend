import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeGridProps } from '#/adapter/vxe-table';
import type { PayMerchant } from '#/api/pay/merchant';

import { $t } from '@vben/locales';

const STATUS_OPTIONS = [
  { label: '启用', value: 1, color: 'green' },
  { label: '停用', value: 0, color: 'red' },
];

const TYPE_OPTIONS = [
  { label: '微信支付', value: 'weixin', color: 'processing' },
  { label: '支付宝', value: 'alipay', color: 'blue' },
];

// ===== 依赖条件函数 =====
// 注意：vee-validate 对 fieldName 带 '.' 的字段自动创建嵌套对象
// 即 fieldName: 'config.appId' → values = { config: { appId: '...' } }
// 所以访问方式必须是 values?.config?.appId，不能用 values?.['config.appId']

function isWeixin(values: Record<string, any>) {
  return values?.type === 'weixin';
}
function isAlipay(values: Record<string, any>) {
  return values?.type === 'alipay';
}
function isWeixinV2(values: Record<string, any>) {
  return isWeixin(values) && values?.config?.apiVersion === 'v2';
}
function isWeixinV3(values: Record<string, any>) {
  return isWeixin(values) && values?.config?.apiVersion !== 'v2';
}
function isAlipayPubkey(values: Record<string, any>) {
  return isAlipay(values) && values?.config?.mode === 1;
}
function isAlipayCert(values: Record<string, any>) {
  return isAlipay(values) && values?.config?.mode === 2;
}
function isAlipayEncryptAES(values: Record<string, any>) {
  return isAlipay(values) && values?.config?.encryptType === 'AES';
}

// ===== 列表搜索 =====
export const querySchema: VbenFormSchema[] = [
  {
    component: 'Select', fieldName: 'type', label: '类型',
    componentProps: { allowClear: true, options: TYPE_OPTIONS, style: 'min-width: 140px' },
  },
  {
    component: 'Select', fieldName: 'status', label: '状态',
    componentProps: { allowClear: true, options: STATUS_OPTIONS },
  },
];

// ===== 列表列 =====
export function useColumns(onActionClick?: OnActionClickFn<PayMerchant>): VxeGridProps['columns'] {
  return [
    { field: 'seq', title: '#', type: 'seq', width: 50 },
    { field: 'id', title: 'ID', width: 60 },
    { field: 'name', title: '商户名称', minWidth: 150 },
    { field: 'type', title: '类型', width: 100, cellRender: { name: 'CellTag', options: TYPE_OPTIONS } },
    { field: 'status', title: '状态', width: 80, cellRender: { name: 'CellTag', options: STATUS_OPTIONS } },
    { field: 'remark', title: '备注', minWidth: 150 },
    { field: 'created_time', title: '创建时间', width: 170 },
    {
      field: 'operation', title: $t('common.table.operation'), align: 'center', fixed: 'right', width: 160,
      cellRender: { attrs: { nameField: 'name', onClick: onActionClick }, name: 'CellOperation', options: ['edit', 'delete'] },
    },
  ];
}

// ===== 表单 =====
export const formSchema: VbenFormSchema[] = [
  // ========== 基础信息 ==========
  {
    component: 'Input', fieldName: 'name', label: '商户名称', rules: 'required',
    componentProps: { placeholder: '如：唤星微信支付' },
  },
  {
    component: 'Select', fieldName: 'type', label: '支付方式', rules: 'required',
    componentProps: { options: TYPE_OPTIONS, placeholder: '选择微信/支付宝' },
  },
  {
    component: 'RadioGroup', fieldName: 'status', label: '状态', defaultValue: 1,
    componentProps: { options: STATUS_OPTIONS },
  },
  {
    component: 'Input', fieldName: 'remark', label: '备注',
    componentProps: { placeholder: '备注信息' },
  },

  // ========== 微信支付配置 ==========
  {
    component: 'Divider', fieldName: '_wx_divider', label: '',
    renderComponentContent: () => ({ default: () => '微信支付配置' }),
    dependencies: { triggerFields: ['type'], if: isWeixin },
  },
  {
    component: 'Input', fieldName: 'config.appId', label: '微信 AppID', rules: 'required',
    componentProps: { placeholder: '公众号/小程序/开放平台 AppID' },
    dependencies: { triggerFields: ['type'], if: isWeixin },
  },
  {
    component: 'Input', fieldName: 'config.mchId', label: '商户号', rules: 'required',
    componentProps: { placeholder: '微信支付商户号' },
    dependencies: { triggerFields: ['type'], if: isWeixin },
  },
  {
    component: 'RadioGroup', fieldName: 'config.apiVersion', label: 'API 版本', defaultValue: 'v3',
    componentProps: { options: [{ label: 'v2', value: 'v2' }, { label: 'v3（推荐）', value: 'v3' }] },
    dependencies: { triggerFields: ['type'], if: isWeixin },
  },
  // --- 微信 v2 ---
  {
    component: 'Input', fieldName: 'config.mchKey', label: '商户密钥',
    componentProps: { placeholder: 'v2 商户密钥' },
    dependencies: { triggerFields: ['type', 'config.apiVersion'], if: isWeixinV2 },
  },
  {
    component: 'Textarea', fieldName: 'config.keyContent', label: 'p12 证书(Base64)',
    componentProps: { rows: 4, placeholder: 'apiclient_cert.p12 Base64' },
    dependencies: { triggerFields: ['type', 'config.apiVersion'], if: isWeixinV2 },
  },
  // --- 微信 v3 ---
  {
    component: 'Input', fieldName: 'config.apiV3Key', label: 'API V3 密钥',
    componentProps: { placeholder: '32位 API V3 密钥' },
    dependencies: { triggerFields: ['type', 'config.apiVersion'], if: isWeixinV3 },
  },
  {
    component: 'Textarea', fieldName: 'config.privateKeyContent', label: '私钥(PEM)',
    componentProps: { rows: 6, placeholder: 'apiclient_key.pem 内容' },
    dependencies: { triggerFields: ['type', 'config.apiVersion'], if: isWeixinV3 },
  },
  {
    component: 'Input', fieldName: 'config.certSerialNo', label: '证书序列号',
    componentProps: { placeholder: '商户 API 证书序列号' },
    dependencies: { triggerFields: ['type', 'config.apiVersion'], if: isWeixinV3 },
  },

  // ========== 支付宝配置 ==========
  {
    component: 'Divider', fieldName: '_ali_divider', label: '',
    renderComponentContent: () => ({ default: () => '支付宝配置' }),
    dependencies: { triggerFields: ['type'], if: isAlipay },
  },
  {
    component: 'Input', fieldName: 'config.appId', label: '开放平台 APPID', rules: 'required',
    componentProps: { placeholder: '支付宝开放平台应用 AppID' },
    dependencies: { triggerFields: ['type'], if: isAlipay },
  },
  {
    component: 'RadioGroup', fieldName: 'config.serverUrl', label: '网关地址',
    defaultValue: 'https://openapi.alipay.com/gateway.do',
    componentProps: {
      options: [
        { label: '线上环境', value: 'https://openapi.alipay.com/gateway.do' },
        { label: '沙箱环境', value: 'https://openapi-sandbox.dl.alipaydev.com/gateway.do' },
      ],
    },
    dependencies: { triggerFields: ['type'], if: isAlipay },
  },
  {
    component: 'RadioGroup', fieldName: 'config.signType', label: '签名算法', defaultValue: 'RSA2',
    componentProps: { options: [{ label: 'RSA2', value: 'RSA2' }] },
    dependencies: { triggerFields: ['type'], if: isAlipay },
  },
  {
    component: 'RadioGroup', fieldName: 'config.mode', label: '公钥类型', defaultValue: 1,
    componentProps: { options: [{ label: '公钥模式', value: 1 }, { label: '证书模式', value: 2 }] },
    dependencies: { triggerFields: ['type'], if: isAlipay },
  },

  // --- 支付宝：公钥模式 (mode=1) ---
  {
    component: 'Textarea', fieldName: 'config.privateKey', label: '应用私钥', rules: 'required',
    componentProps: { rows: 8, placeholder: '应用私钥内容（RSA2）' },
    dependencies: { triggerFields: ['type', 'config.mode'], if: isAlipayPubkey },
  },
  {
    component: 'Textarea', fieldName: 'config.alipayPublicKey', label: '支付宝公钥', rules: 'required',
    componentProps: { rows: 8, placeholder: '支付宝公钥字符串' },
    dependencies: { triggerFields: ['type', 'config.mode'], if: isAlipayPubkey },
  },

  // --- 支付宝：证书模式 (mode=2) ---
  {
    component: 'Textarea', fieldName: 'config.privateKey', label: '应用私钥', rules: 'required',
    componentProps: { rows: 8, placeholder: '应用私钥内容（RSA2）' },
    dependencies: { triggerFields: ['type', 'config.mode'], if: isAlipayCert },
  },
  {
    component: 'Textarea', fieldName: 'config.appCertContent', label: '商户公钥应用证书', rules: 'required',
    componentProps: { rows: 4, placeholder: '商户公钥应用证书内容' },
    dependencies: { triggerFields: ['type', 'config.mode'], if: isAlipayCert },
  },
  {
    component: 'Textarea', fieldName: 'config.alipayPublicCertContent', label: '支付宝公钥证书', rules: 'required',
    componentProps: { rows: 4, placeholder: '支付宝公钥证书内容' },
    dependencies: { triggerFields: ['type', 'config.mode'], if: isAlipayCert },
  },
  {
    component: 'Textarea', fieldName: 'config.rootCertContent', label: '支付宝根证书', rules: 'required',
    componentProps: { rows: 4, placeholder: '支付宝根证书内容' },
    dependencies: { triggerFields: ['type', 'config.mode'], if: isAlipayCert },
  },

  // --- 支付宝：接口内容加密 ---
  {
    component: 'RadioGroup', fieldName: 'config.encryptType', label: '接口内容加密', defaultValue: '',
    componentProps: { options: [{ label: '无加密', value: '' }, { label: 'AES', value: 'AES' }] },
    dependencies: { triggerFields: ['type'], if: isAlipay },
  },
  {
    component: 'Input', fieldName: 'config.encryptKey', label: '加密密钥', rules: 'required',
    componentProps: { placeholder: '接口内容加密密钥' },
    dependencies: { triggerFields: ['type', 'config.encryptType'], if: isAlipayEncryptAES },
  },
];
