import { BasicColumn, FormSchema } from '@/components/Table';
import { Tinymce } from '@/components/Tinymce';
import { h } from 'vue';

// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  {
    title: 'source',
    dataIndex: 'status',
    valueEnum: [
      { label: '订单', value: 'Order', color: 'orange' },
      { label: '提现', value: 'Withdrawal', color: 'yellow' },
      { label: '没收', value: 'Forfeited', color: 'yellow' },
    ],
  },
  {
    title: '慈善金金额',
    dataIndex: 'amount',
  },
  {
    title: '用户 ID',
    dataIndex: 'userId',
  },
  {
    title: '订单ID',
    dataIndex: 'orderId',
  },
  {
    title: '提现订单ID',
    dataIndex: 'withdrawalId',
  },
  {
    title: '慈善金更新时间',
    dataIndex: 'createdAt',
  },
  {
    title: '慈善金更新时间',
    dataIndex: 'updateAt',
  },
];
export const formSchema: FormSchema[] = [];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'status',
    label: '来源',
    component: 'Select',
    componentProps: {
      options: [
        { label: '订单', value: 'Order', color: 'orange' },
        { label: '提现', value: 'Withdrawal', color: 'yellow' },
      ],
    },
  },
  {
    field: 'orderId',
    label: '订单ID',
    component: 'Input',
  },
  {
    field: 'withdrawalId',
    label: '提现订单ID',
    component: 'Input',
  },
  {
    field: 'createdAt',
    label: '订单创建时间',
    component: 'RangePicker',
  },
];
