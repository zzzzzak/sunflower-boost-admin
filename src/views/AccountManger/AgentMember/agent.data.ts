import { uploadApi } from '@/api/sys/upload';
import { BasicColumn, FormSchema } from '@/components/Table';

const memberStatusConfig = [
  { label: '启用', value: 1, color: 'green' },
  { label: '禁用', value: 0, color: 'red' },
];
const memberOnlineConfig = [
  { label: '在线', value: 1, color: 'green' },
  { label: '离线', value: 0, color: '' },
];

export const columns: BasicColumn[] = [
  { title: '代理ID', dataIndex: 'member_id' },
  { title: '代理昵称', dataIndex: 'member_nickname' },
  { title: '代理名', dataIndex: 'member_username' },
  // { title: '头像地址', dataIndex: 'member_portrait' },
  {
    title: '账户状态',
    dataIndex: 'member_status',
    valueEnum: memberStatusConfig,
  },
  {
    title: '在线状态',
    dataIndex: 'member_online',
    valueEnum: memberOnlineConfig,
  },
  { title: '上次登录时间', dataIndex: 'next_time' },
  { title: '注册时间', dataIndex: 'create_time' },
  { title: '代理级别', dataIndex: 'level' },
  { title: '上级代理名称', dataIndex: 'parent_name' },
];

export const searchFormSchema: FormSchema[] = [
  { label: '代理名', field: 'member_username', component: 'Input' },
  {
    label: '账号状态',
    field: 'member_status',
    component: 'Select',
    componentProps: {
      options: memberStatusConfig,
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
  // { label: '结束时间', field: 'formTime', component: 'DatePicker' },
  // { label: '涨停购买权限', field: 'limit_status', component: 'Input' },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'member_username',
    label: '代理名',
    component: 'Input',
    required: true,
  },
  {
    field: 'member_nickname',
    label: '代理昵称',
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
  },
  { field: 'member_password', label: '登录密码', component: 'InputPassword' },
  {
    field: 'member_status',
    label: '账户状态',
    component: 'Switch',
    componentProps: { checkedValue: 1, unCheckedValue: 0 },
  },
  {
    field: 'member_online',
    label: '在线状态',
    component: 'Switch',
    componentProps: { checkedValue: 1, unCheckedValue: 0 },
  },
  // { field: 'next_time', label: '上次登录时间', component: 'DatePicker' },
];
