import { BasicColumn, FormSchema } from '@/components/Table';

/**
 * 
 * 
 * import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

 @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '请求路径',
  })
  path: string;

  @Column({
    comment: '请求方法',
  })
  method: string;

  @Column({
    comment: '请求参数',
    type: 'text',
    nullable: true,
  })
  query: string;

  @Column({
    comment: '请求体',
    type: 'text',
    nullable: true,
  })
  body: string;

  @Column({
    comment: '响应状态码',
  })
  statusCode: number;

  @Column({
    comment: '响应体',
    type: 'text',
  })
  response: string;

  @Column({
    comment: '请求 IP',
  })
  ip: string;

  @Column({
    comment: '请求设备',
  })
  userAgent: string;

  @Column({
    comment: '请求状态',
  })
  statusText: string;

  @Column({
    comment: '请求用户 ID',
    nullable: true,
  })
  userId: number;

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
  { dataIndex: 'id', title: 'ID' },
  { dataIndex: 'path', title: '请求路径' },
  { dataIndex: 'method', title: '请求方法' },
  { dataIndex: 'query', title: '请求参数' },
  { dataIndex: 'body', title: '请求体' },
  { dataIndex: 'statusCode', title: '响应状态码' },
  { dataIndex: 'response', title: '响应体' },
  { dataIndex: 'ip', title: '请求 IP' },
  { dataIndex: 'userAgent', title: '请求设备' },
  { dataIndex: 'statusText', title: '请求状态' },
  { dataIndex: 'userId', title: '请求用户 ID' },
  { dataIndex: 'createdAt', title: '创建时间' },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'path',
    label: '请求路径',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'method',
    label: '请求方法',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'statusCode',
    label: '响应状态码',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'ip',
    label: '请求 IP',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'statusText',
    label: '请求状态',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'userId',
    label: '请求用户 ID',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '创建时间',
    field: 'toTime',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];

export const formSchema: FormSchema[] = [];
