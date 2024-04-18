import { BasicColumn, FormSchema } from '@/components/Table';
import { Tinymce } from '@/components/Tinymce';
import { h } from 'vue';

// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  {
    title: '慈善等级名称',
    dataIndex: 'name',
  },
  {
    title: '慈善值',
    dataIndex: 'amount',
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

export const searchFormSchema: FormSchema[] = [];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '慈善等级名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'amount',
    label: '慈善值',
    component: 'InputNumber',
    required: true,
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'description',
    label: '描述',
    component: 'Input',
    // rules: [{ required: true }],
    // render: ({ model }) => {
    //   return h(Tinymce, {
    //     modelValue: model.content,
    //     'onUpdate:modelValue': (val: string) => (model.content = val),
    //   });
    // },
    // required: true,
  },

  // {
  //   field: 'language',
  //   label: '语言',
  //   component: 'Select',
  //   defaultValue: 'zh-CN',
  //   componentProps: {
  //     options: [
  //       {
  //         label: '中文',
  //         value: 'zh-CN',
  //       },
  //       {
  //         label: '英文',
  //         value: 'en-US',
  //       },
  //     ],
  //   },
  // },
];
