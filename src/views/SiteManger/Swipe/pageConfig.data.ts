import { BasicColumn, FormSchema } from '@/components/Table';

export const swipeStatusConfig = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];

export const swipeTypeConfig = [
  { label: '移动端', value: 1 },
  { label: 'PC端', value: 0 },
];
export const swipeIsNewOpenConfig = [
  { label: '新窗口', value: 1 },
  { label: '本窗口', value: 0 },
];

export const columns: BasicColumn[] = [
  { title: '轮播图片链接', dataIndex: 'swipe_image' },
  { title: '点击跳转地址', dataIndex: 'swipe_path' },
  {
    title: '是否新窗口打开',
    dataIndex: 'swipe_isNewOpen',
    customRender: ({ value }) => {
      return swipeIsNewOpenConfig.find((item) => item.value === value)?.label;
    },
  },
  {
    title: '轮播图平台',
    dataIndex: 'swipe_type',
    customRender: ({ value }) => {
      return swipeTypeConfig.find((item) => item.value === value)?.label;
    },
  },
  {
    title: '状态',
    dataIndex: 'swipe_status',
    customRender: ({ value }) => {
      return swipeStatusConfig.find((item) => item.value === value)?.label;
    },
  },
  { title: '排序', dataIndex: 'swipe_sort' },
  { title: '创建时间', dataIndex: 'create_time' },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '轮播状态',
    field: 'status',
    component: 'Select',
    componentProps: { options: swipeStatusConfig },
  },
  {
    label: '是否新窗口打开',
    field: 'isNewOpen',
    component: 'Select',
    componentProps: { options: swipeIsNewOpenConfig },
  },
  {
    label: '轮播图平台',
    field: 'swipe_type',
    component: 'Select',
    componentProps: { options: swipeTypeConfig },
  },
];
export const formSchema: FormSchema[] = [
  { label: '轮播图片链接', field: 'swipe_image', component: 'Input', required: true },
  { label: '点击跳转地址', field: 'swipe_path', component: 'Input', required: true },
  {
    label: '是否新窗口',
    field: 'swipe_isNewOpen',
    component: 'Select',
    componentProps: {
      options: swipeIsNewOpenConfig,
    },
    required: true,
  },
  {
    label: '终端类型',
    field: 'swipe_type',
    component: 'Select',
    componentProps: {
      options: swipeTypeConfig,
    },
    required: true,
  },
  {
    label: '轮播状态',
    field: 'swipe_status',
    component: 'Select',
    componentProps: { options: swipeStatusConfig },
    required: true,
  },
  {
    label: '排序',
    field: 'swipe_sort',
    component: 'InputNumber',
    required: true,
  },
];
