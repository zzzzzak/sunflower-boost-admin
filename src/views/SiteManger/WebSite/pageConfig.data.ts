import { uploadApi } from '@/api/sys/upload';
import { BasicColumn, FormSchema } from '@/components/Table';

export const cashStatusConfig = [
  { label: '待审核', value: 0 },
  { label: '审核成功', value: 1 },
  { label: '审核失败', value: 2 },
];
export const cashTypeConfig = [
  { label: '银行卡', value: 1 },
  { label: '支付宝', value: 2 },
  { label: '微信', value: 3 },
];

export const columns: BasicColumn[] = [
  { title: '站点名称', dataIndex: 'website_name' },
  { title: '站点描述', dataIndex: 'website_description' },
  { title: '站点关键词', dataIndex: 'website_keywords' },
  { title: '站点角标', dataIndex: 'website_favicon' },
  {
    title: '站点logo',
    dataIndex: 'website_logo',
  },
  {
    title: '首页Logo',
    dataIndex: 'website_home',
  },
  { title: '版权信息', dataIndex: 'website_copyright' },
  { title: '备案信息', dataIndex: 'website_beian' },
  { title: '收款账号', dataIndex: 'bank_account' },
  {
    title: '收款账号类型',
    dataIndex: 'bank_type',
    customRender: ({ value }) => {
      return bankTypeConfig.find((item) => item.value === value)?.label;
    },
  },
  {
    title: '站点状态',
    dataIndex: 'website_status',
    customRender: ({ value }) => {
      return websiteStatusConfig.find((item) => item.value === value)?.label;
    },
  },
  { title: '维护内容', dataIndex: 'maintain_content' },
  { title: '客服链接', dataIndex: 'coustem_service' },
];

export const bankTypeConfig = [
  { label: '银行卡', value: 1 },
  { label: '支付宝', value: 2 },
  { label: '微信', value: 3 },
];

export const websiteStatusConfig = [
  { label: '启用', value: 1 },
  { label: '维护', value: 0 },
];
export const formSchema: FormSchema[] = [
  { label: '站点名称', field: 'website_name', component: 'Input', required: true },
  { label: '站点描述', field: 'website_description', component: 'Input' },
  { label: '站点关键词', field: 'website_keywords', component: 'Input', required: true },
  { label: '站点角标', field: 'website_favicon', component: 'Input', required: true },
  {
    label: '站点logo',
    field: 'website_logo',
    component: 'ImageUpload',
    componentProps: {
      api: uploadApi,
      maxNumber: 1,
      maxSize: 2,
    },
    required: true,
  },
  {
    label: '首页Logo',
    field: 'website_home',
    component: 'ImageUpload',
    componentProps: {
      api: uploadApi,
      maxNumber: 1,
      maxSize: 2,
    },
    required: true,
  },
  { label: '版权信息', field: 'website_copyright', component: 'Input' },
  { label: '备案信息', field: 'website_beian', component: 'Input' },
  { label: '收款账号', field: 'bank_account', component: 'Input' },
  {
    label: '收款账号类型',
    field: 'bank_type',
    component: 'Select',
    componentProps: { options: bankTypeConfig },
  },
  {
    label: '站点状态',
    field: 'website_status',
    component: 'Select',
    componentProps: { options: websiteStatusConfig },
  },
  { label: '维护内容', field: 'maintain_content', component: 'Input' },
  { label: '客服链接', field: 'coustem_service', component: 'Input', required: true },
];
