import { BasicColumn, FormSchema } from '@/components/Table';
import { Tinymce } from '@/components/Tinymce';
import { h } from 'vue';

// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  {
    title: '邀请人层级',
    dataIndex: 'inviterLevel',
  },
  {
    title: '分润比例',
    dataIndex: 'profitRate',
  },
  {
    title: '开启大小区',
    dataIndex: 'openSizeArea',
    valueEnum: [
      { value: 1, label: '开启', color: 'yellow' },
      { value: 0, label: '关闭', color: 'orange' },
    ],
  },
  {
    title: '生效状态',
    dataIndex: 'status',
    valueEnum: [
      { value: 1, label: '开启', color: 'green' },
      { value: 0, label: '关闭', color: 'red' },
    ],
  },
  {
    title: '描述',
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

export const searchFormSchema: FormSchema[] = [
  {
    field: 'inviterLevel',
    label: '邀请人层级',
    component: 'InputNumber',
    componentProps: {
      min: 1,
      step: 1,
      precision: 0,
    },
  },
  {
    field: 'profitRate',
    label: '分润比例',
    component: 'InputNumber',
    componentProps: {
      max: 1,
      min: 0,
      step: 0.01,
    },
  },
  {
    field: 'openSizeArea',
    label: '开启大小区',
    component: 'Select',
    componentProps: {
      options: [
        { value: 1, label: '开启', color: 'green' },
        { value: 0, label: '关闭', color: 'red' },
      ],
    },
  },
  {
    field: 'status',
    label: '生效状态',
    component: 'Select',
    componentProps: {
      options: [
        { value: 1, label: '开启', color: 'green' },
        { value: 0, label: '关闭', color: 'red' },
      ],
    },
  },
  {
    field: 'createdAt',
    label: '创建时间',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'inviterLevel',
    label: '邀请人层级',
    required: true,
    component: 'InputNumber',
    componentProps: {
      min: 1,
      step: 1,
      precision: 0,
    },
  },
  {
    field: 'profitRate',
    label: '分润比例',
    required: true,
    component: 'InputNumber',
    componentProps: {
      max: 1,
      min: 0,
      step: 0.01,
    },
  },
  {
    field: 'openSizeArea',
    label: '开启大小区',
    required: true,
    component: 'Switch',
    componentProps: {
      checkedChildren: '开启',
      unCheckedChildren: '关闭',
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    field: 'status',
    label: '生效状态',
    required: true,
    component: 'Switch',
    componentProps: {
      checkedChildren: '开启',
      unCheckedChildren: '关闭',
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    field: 'description',
    label: '描述',
    required: true,
    component: 'Input',
  },
];
