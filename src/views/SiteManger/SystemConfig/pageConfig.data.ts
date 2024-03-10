import { BasicColumn, FormSchema } from '@/components/Table';

export const configStatusConfig = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];

export const columns: BasicColumn[] = [
  { title: '配置名称', dataIndex: 'config_name' },
  { title: '配置Key', dataIndex: 'config_key' },
  { title: '配置内容', dataIndex: 'config_value' },
  {
    title: '配置状态',
    dataIndex: 'config_status',
    customRender: ({ value }) => {
      const status = configStatusConfig.find((item) => item.value === value);
      return status ? status.label : '';
    },
  },
  { title: '修改管理员', dataIndex: 'admin_name' },
  { title: '修改时间', dataIndex: 'release_time' }, // You might want to consider custom rendering for date format
  { title: '创建时间', dataIndex: 'create_time' }, // You might want to consider custom rendering for date format
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
export const searchFormSchema: FormSchema[] = [
  { label: '配置名称', field: 'config_name', component: 'Input' },
  { label: '配置Key', field: 'config_key', component: 'Input' },
  {
    label: '配置状态',
    field: 'config_status',
    component: 'Select',
    componentProps: { options: configStatusConfig },
  },
];
export const formSchema: FormSchema[] = [
  { label: '配置名称', field: 'config_name', component: 'Input', required: true },
  { label: '配置Key', field: 'config_key', component: 'Input', required: true },
  { label: '配置内容', field: 'config_value', component: 'Input', required: true },
  {
    label: '配置状态',
    field: 'config_status',
    component: 'Select',
    required: true,
    componentProps: { options: configStatusConfig },
  },
];
