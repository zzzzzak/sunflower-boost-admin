import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  { title: 'TGid', dataIndex: 'member_tgid' },
  { dataIndex: 'member_balance', title: '用户现余额' },
  { dataIndex: 'total_rechange', title: '总充值' },
  { dataIndex: 'total_withdrawal', title: '总提现' },
  { dataIndex: 'total_bet', title: '总投注' },
  { dataIndex: 'total_winlose', title: '总输赢' },
  { dataIndex: 'total_rebate', title: '总返水' },
  { dataIndex: 'total_wait_rebate', title: '总未返水' },
  { dataIndex: 'total_commission', title: '总返佣' },
  { dataIndex: 'total_jackpot', title: '总派彩' },
  { dataIndex: 'api_money', title: '总游戏余额（非实时）' },
];

export const searchFormSchema = [
  { label: '游戏账号', field: 'member_tgid', component: 'Input' },
  {
    label: '时间',
    field: 'toTime',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
