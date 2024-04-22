import { BasicColumn, FormSchema } from '@/components/Table';

const commissionTypeOptions = [
  { label: '推荐佣金', value: 'INDIRECT' },
  { label: 'M层佣金', value: 'GLOBAL' },
  { label: '静态佣金', value: 'StaticPool' },
  { label: '提现分润', value: 'Withdrawal' },
];

// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  {
    title: '用户 ID',
    dataIndex: 'userId',
  },
  {
    title: '订单 ID',
    dataIndex: 'orderId',
    customRender({ record }) {
      return record.orderId || record.orderIds;
    },
  },
  {
    title: '提现订单ID',
    dataIndex: 'withdrawalId',
  },
  {
    title: '大区资金冻结',
    dataIndex: 'maxChainFreeze',
    valueEnum: [
      {
        label: '已发放',
        value: 0,
        color: 'green',
      },
      {
        label: '已冻结',
        value: 1,
        color: 'red',
      },
    ],
  },
  {
    title: '佣金金额',
    dataIndex: 'amount',
  },
  {
    title: '佣金描述',
    dataIndex: 'description',
  },
  {
    title: '佣金类型',
    dataIndex: 'type',
    valueEnum: commissionTypeOptions,
  },
  {
    title: '佣金比例',
    dataIndex: 'rate',
  },
  {
    title: '佣金创建时间',
    dataIndex: 'createdAt',
  },
  {
    title: '佣金更新时间',
    dataIndex: 'updatedAt',
  },
];
export const formSchema: FormSchema[] = [];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'userId',
    label: '用户 ID',
    component: 'Input',
  },
  {
    field: 'orderId',
    label: '订单 ID',
    component: 'Input',
  },
  {
    field: 'type',
    label: '佣金类型',
    component: 'Select',
    componentProps: {
      options: commissionTypeOptions,
    },
  },
  {
    field: 'maxChainFreeze',
    label: '大区资金冻结',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '已发放',
          value: 0,
        },
        {
          label: '已冻结',
          value: 1,
        },
      ],
    },
  },
  {
    field: 'createdAt',
    label: '订单创建时间',
    component: 'RangePicker',
  },
];
