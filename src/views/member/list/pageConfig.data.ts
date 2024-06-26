import { levelList, getUserList } from '@/api/admin';
import { BasicColumn, FormSchema } from '@/components/Table';

// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  { dataIndex: 'id', title: 'ID', width: 80, align: 'left' },
  { dataIndex: 'walletAddress', title: '币安钱包地址' },
  { dataIndex: 'username', title: '名称' },
  { dataIndex: 'nickname', title: '用户昵称' },
  { dataIndex: 'introduction', title: '用户简介' },
  { dataIndex: 'avatar', title: '用户头像' },
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
  { dataIndex: 'charityAmount', title: '慈善金' },
  {
    dataIndex: 'isRecoupment',
    title: '已回本',
    customRender: ({ record }) => {
      return record.isRecoupment ? '是' : '否';
    },
  },
  { dataIndex: 'createdAt', title: '创建时间' },
  { dataIndex: 'updatedAt', title: '更新时间' },
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
