import { BasicColumn, FormSchema } from '@/components/Table';

const statusOptions = [
  { label: '待审批', value: 'PENDING', color: 'gray' },
  { label: '打款中', value: 'WAITING', color: 'orange' },
  { label: '打款成功', value: 'SUCCESS', color: 'green' },
  { label: '打款失败', value: 'FAILED', color: 'red' },
];

const auditOptions = [
  { label: '待审批', value: 'PENDING', color: 'yellow' },
  { label: '审批通过', value: 'APPROVED', color: 'green' },
  { label: '审批拒绝', value: 'REJECT', color: 'red' },
  { label: '审批退回', value: 'RETURN', color: 'gray' },
];
// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'userId',
  },
  {
    title: '提现金额',
    dataIndex: 'amount',
  },
  {
    title: '实际到账',
    dataIndex: 'realAmount',
  },
  {
    title: '提现手续费',
    dataIndex: 'feeAmount',
  },
  {
    title: '提现地址',
    dataIndex: 'walletAddress',
  },
  {
    title: '提现矿工费BNB交易hash',
    dataIndex: 'minersFeeTransactionHash',
  },
  {
    title: '提现转账交易ID',
    dataIndex: 'transactionHash',
  },
  {
    title: '提现状态',
    dataIndex: 'status',
    valueEnum: statusOptions,
  },
  {
    title: '提现审核',
    dataIndex: 'audit',
    valueEnum: auditOptions,
  },
  {
    title: '提现审核备注',
    dataIndex: 'auditRemark',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
  },
];
export const formSchema: FormSchema[] = [
  {
    field: 'audit',
    label: '提现审核',
    component: 'Select',
    required: true,
    componentProps: {
      options: auditOptions,
    },
  },
  {
    field: 'auditRemark',
    label: '提现审核备注',
    component: 'Input',
    required: true,
  },
  {
    field: 'userId',
    label: '用户ID',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'amount',
    label: '提现金额',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'realAmount',
    label: '实际到账',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'feeAmount',
    label: '提现手续费',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'walletAddress',
    label: '提现地址',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'transactionHash',
    label: '提现转账交易ID',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'status',
    label: '提现状态',
    component: 'Select',
    componentProps: {
      disabled: true,
      options: statusOptions,
    },
  },
  {
    field: 'createdAt',
    label: '创建时间',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const searchFormSchema: FormSchema[] = [
  {
    field: 'userId',
    label: '用户ID',
    component: 'Input',
  },
  {
    field: 'audit',
    label: '提现审核',
    component: 'Select',
    componentProps: {
      options: auditOptions,
    },
  },
  {
    field: 'status',
    label: '提现状态',
    component: 'Select',
    componentProps: {
      options: statusOptions,
    },
  },
  {
    field: 'createdAt',
    label: '创建时间',
    component: 'RangePicker',
  },
];
