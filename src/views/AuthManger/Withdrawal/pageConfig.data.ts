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
  { title: '用户ID', dataIndex: 'member_id' },
  { title: '游戏账号', dataIndex: 'member_tgid' },
  {
    title: 'TGID',
    dataIndex: 'tgid',
    customRender({ text }) {
      return (text || '').replace('GBNBL1913', '');
    },
  },
  { title: '订单号', dataIndex: 'cash_order' },
  { title: '提现金额', dataIndex: 'cash_money' },
  {
    title: '收款类型',
    dataIndex: 'cash_type',
    customRender: ({ value }) => {
      return cashTypeConfig.find((item) => item.value === value)?.label;
    },
  },
  { title: '收款账号', dataIndex: 'cash_account' },
  { title: '备注', dataIndex: 'cash_remark' },
  {
    title: '审核状态',
    dataIndex: 'cash_status',
    customRender: ({ value }) => {
      return cashStatusConfig.find((item) => item.value === value)?.label;
    },
  },
  { title: '审核备注', dataIndex: 'cash_auth_remark' },
  { title: '审核管理员ID', dataIndex: 'admin_member_id' },
  { title: '审核管理员用户名', dataIndex: 'admin_user_name' },
  { title: '审核时间', dataIndex: 'release_time' },
  { title: '写入时间', dataIndex: 'create_time' },
];

export const searchFormSchema: FormSchema[] = [
  { label: '用户ID', field: 'member_id', component: 'Input' },
  { label: '订单号', field: 'cash_order', component: 'Input' },
  {
    label: '收款类型',
    field: 'cash_type',
    component: 'Select',
    componentProps: {
      options: cashTypeConfig,
    },
  },
  {
    label: '审核状态',
    field: 'cash_status',
    component: 'Select',
    componentProps: {
      options: cashStatusConfig,
    },
  },
];

export const formSchema: FormSchema[] = [
  // { label: '订单号', field: 'cash_order', component: 'Input' },
  {
    label: '审核状态',
    field: 'cash_status',
    component: 'Select',
    componentProps: { options: cashStatusConfig },
  },
  { label: '审核备注', field: 'cash_auth_remark', component: 'Input' },
];
export const audioSchema: FormSchema[] = [
  { label: '收款账号', field: 'cash_account', component: 'Input' },
  {
    label: '收款类型',
    field: 'cash_type',
    component: 'Select',
    componentProps: { options: cashTypeConfig },
  },
];
