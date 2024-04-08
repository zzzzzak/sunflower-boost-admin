import { levelList, getUserList } from '@/api/admin';
import { BasicColumn, FormSchema } from '@/components/Table';
import * as adminApi from '@/api/admin/index.ts';
import { uploadApi } from '@/api/sys/upload';
import { h } from 'vue';

// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  { dataIndex: 'walletAddress', title: '币安钱包地址' },
  { dataIndex: 'username', title: '名称' },
  { dataIndex: 'nickname', title: '用户昵称' },
  { dataIndex: 'introduction', title: '用户简介' },
  {
    dataIndex: 'avatar',
    title: '用户头像',
    customRender({ text }) {
      return h('img', {
        src: text,
        style: {
          width: '40px',
          height: '40px',
          borderRadius: '50%',
        },
      });
    },
  },
  { dataIndex: 'inviteCode', title: '邀请码' },
  { dataIndex: 'inviterId', title: '邀请人Id' },
  {
    dataIndex: 'level',
    title: '等级',
    customRender: ({ record }) => {
      return record.level?.name;
    },
  },
  { dataIndex: 'levelId', title: '等级Id' },
  { dataIndex: 'investmentAmount', title: '入金金额' },
  { dataIndex: 'earningsAmount', title: '收益金额' },
  { dataIndex: 'withdrawalAmount', title: '提现金额' },
  { dataIndex: 'frozenAmount', title: '冻结金额' },
  { dataIndex: 'realAmount', title: '实际到账金额' },
  { dataIndex: 'charityAmount', title: '慈善金' },
  {
    dataIndex: 'isRecoupment',
    title: '已回本',
    valueEnum: [
      {
        label: '已回本',
        value: 1,
        color: 'green',
      },
      {
        label: '未回本',
        value: 0,
        color: 'gray',
      },
    ],
  },
  {
    dataIndex: 'withdrawalProhibited',
    title: '禁用用户提现',
    valueEnum: [
      {
        label: '正常',
        value: 0,
        color: 'green',
      },
      {
        label: '禁用',
        value: 1,
        color: 'red',
      },
    ],
  },
  { dataIndex: 'createdAt', title: '创建时间' },
  { dataIndex: 'updatedAt', title: '更新时间' },
];

export const formSchema: FormSchema[] = [
  { required: true, field: 'walletAddress', label: '币安钱包地址', component: 'Input' },
  { required: true, field: 'username', label: '用户名称', component: 'Input' },
  { required: true, field: 'nickname', label: '用户昵称', component: 'Input' },
  { required: true, field: 'introduction', label: '用户简介', component: 'Input' },
  {
    required: true,
    field: 'avatar',
    label: '用户头像',
    component: 'ImageUpload',
    componentProps: {
      api: uploadApi,
      accept: ['gif', 'png', 'jpeg', 'jpg'],
      maxSize: 2,
      maxNumber: 1,
    },
  },
  { required: true, field: 'inviteCode', label: '邀请码', component: 'Input' },
  {
    field: 'inviterId',
    label: '邀请人Id',
    component: 'ApiSelect',
    componentProps: {
      api: () =>
        adminApi
          .getUserList({
            currPage: 1,
            pageSize: 10000,
          })
          .then((res) => res.data),
      labelField: 'nickname',
      valueField: 'id',
    },
  },
  {
    required: false,
    field: 'levelId',
    label: '等级',
    component: 'ApiSelect',
    componentProps: { api: adminApi.levelList, labelField: 'name', valueField: 'id' },
  },
  {
    required: false,
    field: 'withdrawalProhibited',
    label: '禁止用户提现',
    component: 'Switch',
    componentProps: {
      checkedChildren: '正常',
      unCheckedChildren: '禁用',
      checkedValue: 0,
      unCheckedValue: 1,
    },
  },
];

export const forfeitedBalanceFormSchema: FormSchema[] = [
  {
    field: 'amount',
    label: '没收金额',
    component: 'InputNumber',
    required: true,
    componentProps({ formModel }) {
      return {
        max: formModel.availableWithdrawalAmount,
        min: 0,
      };
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'walletAddress', label: '币安钱包地址', component: 'Input' },
  { field: 'username', label: '名称', component: 'Input' },
  { field: 'nickname', label: '用户昵称', component: 'Input' },
  {
    field: 'inviterId',
    label: '邀请人',
    component: 'ApiSelect',
    componentProps: {
      api: () => {
        return getUserList({ currPage: 1, pageSize: 1000 }).then((res) => res.data);
      },
      labelField: 'nickname',
      valueField: 'id',
    },
  },
  {
    field: 'levelId',
    label: '等级',
    component: 'ApiSelect',
    componentProps: {
      api: levelList,
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'isRecoupment',
    label: '是否回本',
    component: 'Select',
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
  },

  {
    label: '创建时间',
    field: 'createdAt',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
