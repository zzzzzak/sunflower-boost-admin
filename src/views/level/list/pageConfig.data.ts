import { BasicColumn, FormSchema } from '@/components/Table';
import { Tinymce } from '@/components/Tinymce';
import { h } from 'vue';

// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  {
    title: '等级名称',
    dataIndex: 'name',
  },
  {
    title: '等级购买金额',
    dataIndex: 'purchaseAmount',
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
  {
    title: '隐藏购买',
    dataIndex: 'hidePurchaseEntry',
    valueEnum: [
      {
        label: '隐藏',
        value: 1,
        color: 'gray',
      },
      {
        label: '显示',
        value: 0,
        color: 'success',
      },
    ],
  },
  {
    title: '全局分润比例',
    dataIndex: 'globalProfitRate',
  },
  {
    title: '参与静态分润',
    dataIndex: 'isStaticProfit',
    valueEnum: [
      { value: 1, label: '是' },
      { value: 0, label: '否' },
    ],
  },
  {
    title: '提现比例',
    dataIndex: 'withdrawalRate',
  },
  {
    title: '等级描述',
    dataIndex: 'description',
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
    field: 'name',
    label: '等级名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'purchaseAmount',
    label: '等级购买金额',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'hidePurchaseEntry',
    label: '隐藏购买',
    component: 'Switch',
    required: true,
    componentProps: {
      checkedChildren: '展示',
      unCheckedChildren: '隐藏',
      checkedValue: 0,
      unCheckedValue: 1,
    },
  },
  {
    field: 'purchaseAmount',
    label: '等级购买金额',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'globalProfitRate',
    label: '全局分润比例',
    component: 'InputNumber',
    componentProps: {
      max: 1,
      min: 0,
      step: 0.01,
    },
    required: true,
  },
  {
    field: 'isStaticProfit',
    label: '参与静态分润',
    component: 'Switch',
    componentProps: {
      checkedChildren: '是',
      unCheckedChildren: '否',
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    field: 'withdrawalRate',
    label: '提现比例',
    component: 'InputNumber',
    componentProps: {
      max: 1,
      min: 0,
      step: 0.01,
    },
    required: true,
  },
  {
    field: 'description',
    required: true,
    component: 'InputTextArea',
    label: '等级描述',
    componentProps: {
      rows: 10,
      placeholder: '请输入等级描述',
    },
    // render: ({ model, field }) => {
    //   return h(Tinymce, {
    //     value: model[field],
    //     onChange: (value: string) => {
    //       model[field] = value;
    //     },
    //   });
    // },
  },
];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const searchFormSchema: FormSchema[] = [];
