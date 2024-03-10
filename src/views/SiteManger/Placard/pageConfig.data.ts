import { BasicColumn, FormSchema } from '@/components/Table';
import { Tinymce } from '@/components/Tinymce';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  { title: '公告名称', dataIndex: 'placard_name' },
  { title: '公告内容', dataIndex: 'placard_content' },
  { title: '公告类型', dataIndex: 'placard_type' },
  { title: '公告状态', dataIndex: 'placard_status' },
  { title: '公告排序', dataIndex: 'placard_sort' },
  { title: '创建时间', dataIndex: 'create_time' },
];

export const searchFormSchema: FormSchema[] = [
  { label: '公告名称', field: 'placard_name', component: 'Input' },
  { label: '公告类型', field: 'placard_type', component: 'Input' },
  { label: '公告状态', field: 'placard_status', component: 'Input' },
];

export const accountFormSchema: FormSchema[] = [
  { field: 'placard_name', label: '公告名称', required: true, component: 'Input' },
  { field: 'placard_type', label: '公告类型', required: true, component: 'Input' },
  { field: 'placard_status', label: '公告状态', required: true, component: 'Input' },
  { field: 'placard_sort', label: '公告排序', required: true, component: 'InputNumber' },
  {
    field: 'placard_content',
    required: true,
    component: 'Input',
    label: '公告内容',
    rules: [{ required: true }],
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
];
