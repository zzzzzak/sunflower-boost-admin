import { BasicColumn } from '@/components/Table';
/**
 * table 数据描述
 * member_id	number  ·用户唯一ID
 * member_tgid	string  ·TGid
 * member_balance	string  ·用户现余额
 * total_rechange	string  ·总充值
 * total_withdrawal	number  ·总提现
 * total_bet	number  ·总投注
 * total_winlose	number  ·总输赢
 * total_rebate	number  ·总返水
 * total_wait_rebate	number  ·总未返水
 * total_commission	number  ·总返佣
 * total_jackpot	number  ·总派彩
 * api_money	number  ·总游戏余额（非实时）
 * game_number	number  ·游戏局数
 */
export const columns: BasicColumn[] = [
  { title: '用户ID', dataIndex: 'member_id' },
  { title: 'TGID', dataIndex: 'member_tgid' },
  { title: '用户现余额', dataIndex: 'member_balance' },
  { title: '总充值', dataIndex: 'total_rechange' },
  { title: '总提现', dataIndex: 'total_withdrawal' },
  { title: '总投注', dataIndex: 'total_bet' },
  { title: '总输赢', dataIndex: 'total_winlose' },
  { title: '总返水', dataIndex: 'total_rebate' },
  { title: '总未返水', dataIndex: 'total_wait_rebate' },
  { title: '总返佣', dataIndex: 'total_commission' },
  { title: '总派彩', dataIndex: 'total_jackpot' },
  { title: '总游戏余额（非实时）', dataIndex: 'api_money' },
  { title: '游戏局数', dataIndex: 'game_number' },
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
