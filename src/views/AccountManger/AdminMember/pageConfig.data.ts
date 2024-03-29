import * as adminGroup from '@/api/sys/adminGroup';
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
  { title: '用户ID', dataIndex: 'member_id' },
  { title: '用户昵称', dataIndex: 'member_nickname' },
  { title: '用户名', dataIndex: 'member_username' },
  // { title: '头像地址', dataIndex: 'member_portrait' },
  { title: '用户组ID', dataIndex: 'member_group' },
  { title: '谷歌验证码秘钥', dataIndex: 'member_authkey' },
  { title: '账户状态', dataIndex: 'member_status', valueEnum: memberStatusConfig },
  { title: '在线状态', dataIndex: 'member_online', valueEnum: memberOnlineConfig },
  { title: '上次登录时间', dataIndex: 'next_time' },
  { title: '注册时间', dataIndex: 'create_time' },
];

export const searchFormSchema: FormSchema[] = [
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
  {
    label: '创建时间',
    field: 'toTime',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
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
  { field: 'member_password', label: '登录密码', component: 'InputPassword' },
  {
    field: 'member_group',
    label: '用户组ID',
    component: 'ApiSelect',
    componentProps: {
      api: adminGroup.getList,
      resultField: 'list',
      valueField: 'id',
      labelField: 'auth_title',
      params: {
        pageIndex: 1,
        pageSize: 1000,
      },
    },
    required: true,
  },
  {
    field: 'member_authkey',
    label: '谷歌验证码秘钥',
    required: true,
    slot: 'googleQrcode',
  },
  {
    field: 'member_status',
    label: '账户状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
    required: true,
  },
];
