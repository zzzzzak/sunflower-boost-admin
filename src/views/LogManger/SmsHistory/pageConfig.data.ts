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
  { title: '手机号', dataIndex: 'sms_phone' },
  { title: '短信内容', dataIndex: 'sms_code' },
  { title: '通道类型', dataIndex: 'sms_type' },
  { title: '发送状态', dataIndex: 'sms_status' },
  { title: '写入时间', dataIndex: 'create_time' },
];

export const searchFormSchema: FormSchema[] = [
  { label: '手机号', field: 'sms_phone', component: 'Input' },
  { label: '通道类型', field: 'sms_type', component: 'Input' },
  {
    label: '发送状态',
    field: 'sms_status',
    component: 'Input',
  },
];
