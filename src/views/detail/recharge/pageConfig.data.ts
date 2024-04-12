import { BasicColumn, FormSchema } from '@/components/Table';

const binancePaymentStatusOptions = [
  {
    label: '待付款',
    value: 'PENDING',
    color: 'gray',
  },
  {
    label: '成功',
    value: 'SUCCESS',
    color: 'green',
  },
  {
    label: '失败',
    value: 'FAILED',
    color: 'red',
  },
];

const completionOfProfitSharingConfig = [
  {
    label: '未完成',
    value: 0,
    color: 'red',
  },
  {
    label: '已完成',
    value: 1,
    color: 'green',
  },
];

// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  {
    title: '订单ID',
    dataIndex: 'id',
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
  },
  {
    title: '是否完成分润',
    dataIndex: 'completionOfProfitSharing',
    valueEnum: completionOfProfitSharingConfig,
  },
  {
    title: '订单金额',
    dataIndex: 'amount',
  },
  {
    title: '订单描述',
    dataIndex: 'description',
  },
  {
    title: '订单前等级',
    dataIndex: 'beforeLevelId',
  },
  {
    title: '订单后等级',
    dataIndex: 'afterLevelId',
  },
  {
    title: '币安支付状态',
    dataIndex: 'binancePaymentStatus',
    valueEnum: binancePaymentStatusOptions,
  },
  {
    title: '币安支付交易ID',
    dataIndex: 'transactionHash',
  },
  {
    title: '订单创建时间',
    dataIndex: 'createdAt',
  },
  {
    title: '订单更新时间',
    dataIndex: 'updatedAt',
  },
];
export const formSchema: FormSchema[] = [
  {
    field: 'binancePaymentStatus',
    label: '币安支付状态',
    component: 'Select',
    required: true,
    componentProps: {
      options: binancePaymentStatusOptions,
    },
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'userId',
    label: '用户ID',
    component: 'Input',
  },
  {
    field: 'binancePaymentStatus',
    label: '币安支付状态',
    component: 'Select',
    componentProps: {
      options: binancePaymentStatusOptions,
    },
  },
  {
    field: 'transactionHash',
    label: '币安支付交易ID',
    component: 'Input',
  },
  {
    field: 'createdAt',
    label: '订单创建时间',
    component: 'RangePicker',
  },
];
