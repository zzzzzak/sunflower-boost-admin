import { BasicColumn, FormSchema } from '@/components/Table';
import { Tinymce } from '@/components/Tinymce';
import { h } from 'vue';

/**
 * 
 * 
 * import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  orderBy: {
    createdAt: 'DESC',
  },
})
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '标题',
  })
  title: string;

  @Column({
    comment: '封面图',
    nullable: true,
  })
  cover: string;

  @Column({
    comment: '内容',
    type: 'longtext',
  })
  content: string;

  @Column({
    comment: '状态',
    type: 'tinyint',
    default: 1,
  })
  status: number;

  @Column({
    comment: '语言',
    default: 'zh-CN',
  })
  language: string;

  @Column({
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    comment: '更新时间',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}


 */

// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  // {
  //   title: '封面图',
  //   dataIndex: 'cover',
  //   customRender: ({ record }) => {
  //     return h('img', {
  //       src: record.cover,
  //       alt: '封面图',
  //       style: {
  //         width: '80px',
  //       },
  //     });
  //   },
  // },
  {
    title: '类型',
    dataIndex: 'type',
    valueEnum: [
      {
        label: '视频',
        value: 1,
        color: 'yellow',
      },
      {
        label: '公告',
        value: 0,
        color: 'orange',
      },
    ],
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: [
      {
        label: '启用',
        value: 1,
        color: 'green',
      },
      {
        label: '禁用',
        value: 0,
        color: 'red',
      },
    ],
  },
  // {
  //   title: '语言',
  //   dataIndex: 'language',
  // },
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
  // {
  //   field: 'title',
  //   label: '标题',
  //   component: 'Input',
  // },
  {
    field: 'type',
    label: '类型',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '视频',
          value: 1,
        },
        {
          label: '公告',
          value: 0,
        },
      ],
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
  },
  // {
  //   field: 'language',
  //   label: '语言',
  //   component: 'Select',
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

export const formSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    required: true,
  },
  // {
  //   field: 'cover',
  //   label: '封面图',
  //   component: 'Input',
  //   required: true,
  // },
  {
    field: 'type',
    label: '类型',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '视频',
          value: 1,
        },
        {
          label: '公告',
          value: 0,
        },
      ],
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Switch',
    defaultValue: 1,
    componentProps: {
      checkedChildren: '启用',
      unCheckedChildren: '禁用',
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    field: 'content',
    label: '内容',
    component: 'Input',
    rules: [{ required: true }],
    render: ({ model }) => {
      return h(Tinymce, {
        modelValue: model.content,
        'onUpdate:modelValue': (val: string) => (model.content = val),
      });
    },
    required: true,
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
