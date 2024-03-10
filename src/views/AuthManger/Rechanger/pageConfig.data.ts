import { getList as getAgentList } from '@/api/sys/agent';
import { BasicColumn, FormSchema } from '@/components/Table';

export const bankTypeConfig = [
  { label: '银行卡', value: 1 },
  { label: '支付宝', value: 2 },
  { label: '微信', value: 3 },
];
export const changeStatusConfig = [
  { label: '待审核', value: 0 },
  { label: '通过', value: 1 },
  { label: '拒绝', value: 2 },
] as Array<{ label: string; value: 0 | 1 | 2; disabled?: boolean }>;

export const columns: BasicColumn[] = [
  { dataIndex: 'member_username', title: '用户名' },
  { dataIndex: 'order_no', title: '订单号' },
  { dataIndex: 'real_money', title: '充值金额' },
  { dataIndex: 'change_money', title: '上分值' },
  { dataIndex: 'bank_account', title: '收款账号' },
  { dataIndex: 'change_image', title: '支付截图' },
  {
    dataIndex: 'bank_type',
    title: '收款类型',
    valueEnum: bankTypeConfig,
  },
  {
    dataIndex: 'change_status',
    title: '审核状态',
    valueEnum: changeStatusConfig,
  },
  { dataIndex: 'admin_member_id', title: '审核管理员ID' },
  { dataIndex: 'release_time', title: '审核时间' },
  { dataIndex: 'create_time', title: '写入时间' },
];

export const searchFormSchema: FormSchema[] = [
  { label: '用户名', field: 'member_username', component: 'Input' },
  { label: '收款账号', field: 'bank_account', component: 'Input' },
  {
    label: '类型',
    field: 'bank_type',
    component: 'Select',
    componentProps: {
      options: bankTypeConfig,
    },
  },
  {
    label: '审核状态',
    field: 'change_status',
    component: 'Select',
    componentProps: {
      options: changeStatusConfig,
    },
  },
  {
    label: '代理ID',
    field: 'agent_id',
    component: 'ApiSelect',
    componentProps: {
      api: getAgentList,
      resultField: 'list',
      valueField: 'member_id',
      labelField: 'member_username',
      params: {
        pageIndex: 1,
        pageSize: 1000,
      },
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '审核状态',
    field: 'change_status',
    component: 'Select',
    required: true,
    componentProps: {
      options: changeStatusConfig.map((item, index) => {
        item.disabled = !index;
        return item;
      }),
    },
  },
  { label: '审核备注', field: 'chang_auth_remark', component: 'InputTextArea' },
];
