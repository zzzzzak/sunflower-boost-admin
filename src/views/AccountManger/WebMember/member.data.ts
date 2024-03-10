import { uploadApi } from '@/api/sys/upload';
import { BasicColumn, FormSchema } from '@/components/Table';

const memberCertificationConfig = [
  { label: '已实名', value: 1, color: 'green' },
  { label: '未实名', value: 0, color: '' },
];
const memberStatusConfig = [
  { label: '启用', value: 1, color: 'green' },
  { label: '禁用', value: 0, color: 'red' },
];
const memberOnlineConfig = [
  { label: '在线', value: 1, color: 'green' },
  { label: '离线', value: 0, color: '' },
];

export const columns: BasicColumn[] = [
  { title: '用户ID', dataIndex: 'member_id' },
  { title: '游戏账号', dataIndex: 'member_tgid' },
  {
    title: 'TGID',
    dataIndex: 'member_tgid',
    customRender({ text }) {
      return (text || '').replace('GBNBL1913', '');
    },
  },
  { title: '用户昵称', dataIndex: 'member_nickname' },
  { title: '用户名', dataIndex: 'member_username' },
  // { title: '头像地址', dataIndex: 'member_portrait' },
  { title: '账户余额', dataIndex: 'member_balance' },

  { title: '总投注', dataIndex: 'total_bet' },
  { title: '总输赢', dataIndex: 'total_winlose' },
  { title: '游戏局数', dataIndex: 'game_number' },

  { title: '用户地区', dataIndex: 'member_city' },
  { title: 'IP属地', dataIndex: 'member_location' },
  { title: '余额状态', dataIndex: 'balance_status', valueEnum: memberStatusConfig },
  // {
  //   title: '实名状态',
  //   dataIndex: 'member_certification',
  //   valueEnum: memberCertificationConfig,
  // },
  {
    title: '账户状态',
    dataIndex: 'member_status',
    valueEnum: memberStatusConfig,
  },
  { title: '在线状态', dataIndex: 'member_online', valueEnum: memberOnlineConfig },
  // { title: '涨停购买开始时间', dataIndex: 'start_time' },
  // { title: '涨停购买截止时间', dataIndex: 'end_time' },
  { title: '上次登录时间', dataIndex: 'next_time' },
  { title: '注册时间', dataIndex: 'create_time' },
  { title: '邀请代理名称', dataIndex: 'agent_name' },
  { title: '上上级代理名称', dataIndex: 'agent_parent_name' },
];

export const searchFormSchema: FormSchema[] = [
  { label: '游戏账号', field: 'member_tgid', component: 'Input' },
  { label: '用户昵称', field: 'member_nickname', component: 'Input' },
  { label: '用户名', field: 'member_username', component: 'Input' },
  {
    label: '账号状态',
    field: 'member_status',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
  // {
  //   label: '是否模拟账户',
  //   field: 'is_imitate',
  //   component: 'Switch',
  //   componentProps: {
  //     checkedValue: 1,
  //     unCheckedValue: 0,
  //   },
  // },
  {
    label: '创建时间',
    field: 'toTime',
    component: 'RangePicker',
    componentProps: {
      showTime: true,
    },
  },
  // { label: '结束时间', field: 'formTime', component: 'DatePicker' },
  // { label: '涨停购买权限', field: 'limit_status', component: 'Input' },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'member_username',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'member_nickname',
    label: '用户昵称',
    component: 'Input',
    required: true,
  },
  {
    field: 'member_portrait',
    label: '头像地址',
    component: 'ImageUpload',
    componentProps: {
      api: uploadApi,
      accept: ['png', 'jpeg', 'jpg'],
      maxSize: 2,
      maxNumber: 1,
    },
    required: true,
  },
  {
    field: 'member_password',
    label: '登录密码',
    component: 'InputPassword',
  },
  // {
  //   field: 'member_balance',
  //   label: '账户余额',
  //   component: 'Input',
  //   componentProps: { disabled: true },
  // },

  { field: 'member_city', label: '用户地区', component: 'Input', required: true },
  { field: 'member_location', label: 'IP属地', component: 'Input' },
  {
    field: 'balance_status',
    label: '余额状态',
    component: 'Select',
    componentProps: { options: memberStatusConfig },
  },
  {
    field: 'member_status',
    label: '账户状态',
    component: 'Switch',
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    field: 'member_online',
    label: '在线状态',
    component: 'Switch',
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  // { field: 'next_time', label: '上次登录时间', component: 'Input' },
  { field: 'credit', label: '信用分', component: 'Input', required: true },
];

export const changeBalanceFormSchema: FormSchema[] = [
  {
    field: 'balance',
    label: '金额',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'type',
    label: '操作',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '上分', value: 1 },
        { label: '下分', value: 2 },
      ],
    },
  },
];
export const changeJackpotFormSchema: FormSchema[] = [
  {
    field: 'balance',
    label: '金额',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'type',
    label: '操作',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '上分', value: 1 },
        { label: '下分', value: 2 },
      ],
    },
  },
];
export const exchangeBalanceFormSchema: FormSchema[] = [
  {
    field: 'balance',
    label: '金额',
    component: 'InputNumber',
    required: true,
  },
];
