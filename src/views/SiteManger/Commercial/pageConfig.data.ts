import { uploadApi } from '@/api/sys/upload';
import { BasicColumn, FormSchema } from '@/components/Table';

const adIsNewOpenConfig = [
  { label: '新窗口', value: 1 },
  { label: '本窗口', value: 0 },
];
//1移动端 0PC端
const adTypeConfig = [
  { label: '移动端', value: 1 },
  { label: 'PC端', value: 0 },
];
// 1启用 0禁用
const adStatusConfig = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];

export const columns: BasicColumn[] = [
  { title: '广告图片链接', dataIndex: 'ad_image' },
  { title: '点击跳转地址', dataIndex: 'ad_path' },
  {
    title: '新窗口打开',
    dataIndex: 'ad_isNewOpen',
    customRender: ({ record }) => {
      return adIsNewOpenConfig.find((item) => item.value === record.operate)?.label;
    },
  }, //1新窗口 0本窗口
  {
    title: '投放平台',
    dataIndex: 'ad_type',
    customRender: ({ record }) => {
      return adTypeConfig.find((item) => item.value === record.operate)?.label;
    },
  },
  {
    title: '状态',
    dataIndex: 'ad_status',
    customRender: ({ record }) => {
      return adStatusConfig.find((item) => item.value === record.operate)?.label;
    },
  },
  { title: '排序', dataIndex: 'ad_sort' },
  { title: '创建时间', dataIndex: 'create_time' },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '新窗口打开',
    field: 'isNewOpen',
    component: 'Select',
    componentProps: { options: adIsNewOpenConfig },
  },
  {
    label: '投放平台',
    field: 'ad_type',
    component: 'Select',
    componentProps: { options: adTypeConfig },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: { options: adStatusConfig },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'ad_image',
    label: '广告图片链接',
    required: true,
    component: 'ImageUpload',
    componentProps: {
      api: uploadApi,
      accept: ['png', 'jpeg', 'jpg'],
      maxSize: 2,
      maxNumber: 1,
    },
  },
  { field: 'ad_path', label: '点击跳转地址', required: true, component: 'Input' },
  {
    label: '新窗口打开',
    field: 'ad_isNewOpen',
    required: true,
    component: 'Select',
    componentProps: { options: adIsNewOpenConfig },
  },
  {
    label: '投放平台',
    field: 'ad_type',
    required: true,
    component: 'Select',
    componentProps: { options: adTypeConfig },
  },
  {
    label: '状态',
    field: 'ad_status',
    required: true,
    component: 'Select',
    componentProps: { options: adStatusConfig },
  },
  {
    label: '排序',
    field: 'ad_sort',
    required: true,
    component: 'InputNumber',
  },
];
