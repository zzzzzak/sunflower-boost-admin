import { BasicColumn, FormSchema } from '@/components/Table';
import { Tinymce } from '@/components/Tinymce';
import { h } from 'vue';

const commissionTypeOptions = [
  { label: '推荐佣金', value: 'INDIRECT' },
  { label: 'M层佣金', value: 'GLOBAL' },
  { label: '静态佣金', value: 'StaticPool' },
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
    dataIndex: 'updateAt',
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
];
