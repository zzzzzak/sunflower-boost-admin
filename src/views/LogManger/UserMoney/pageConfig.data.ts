import { BasicColumn, FormSchema } from '@/components/Table';

export const typeConfig = [
  { label: '余额充值', value: 1 },
  { label: '申请提现', value: 2 },
  { label: '提现退款', value: 3 },
  { label: '转入', value: 4 },
  { label: '转出', value: 5 },
  { label: '系统', value: 6 },
  { label: '返水', value: 7 },
];

export const actionConfig = [
  { label: '收入  ', value: '1' },
  { label: '支出  ', value: '2' },
];
export const columns: BasicColumn[] = [
  { dataIndex: 'title', title: '标题' },
  { dataIndex: 'member_id', title: '用户ID' },
  { dataIndex: 'type', title: '操作类型', valueEnum: typeConfig },
  { dataIndex: 'member_username', title: '用户姓名  ' },
  { dataIndex: 'money', title: '金额' },
  { dataIndex: 'before_money', title: '变更前余额' },
  { dataIndex: 'after_money', title: '变更后余额' },
  { dataIndex: '_action', title: '收入类型', valueEnum: actionConfig },
  { dataIndex: 'from_user_id', title: '来源用户编号' },
  { dataIndex: 'from_username', title: '来源用户名称' },
  { dataIndex: 'today_date', title: '日期' },
  { dataIndex: 'status', title: '状态' },
  { dataIndex: 'memo', title: '变更备注' },
  { dataIndex: 'create_time', title: '写入时间' },
];

export const searchFormSchema: FormSchema[] = [
  { label: '用户姓名', field: 'member_username', component: 'Input' },
  {
    label: '收入类型',
    field: 'action',
    component: 'Select',
    componentProps: {
      options: actionConfig,
    },
  },
  {
    label: '操作类型  ',
    field: 'type',
    component: 'Select',
    componentProps: {
      options: typeConfig,
    },
  },
  {
    label: '创建时间',
    field: 'toTime',
    component: 'RangePicker',
    componentProps: {
      showTime: true,
    },
  },
];
