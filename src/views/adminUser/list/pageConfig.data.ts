import { BasicColumn, FormSchema } from '@/components/Table';

// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  { dataIndex: 'id', title: 'ID' },
  { dataIndex: 'username', title: '用户名' },
  { dataIndex: 'createdAt', title: '创建时间' },
  { dataIndex: 'updateAt', title: '更新时间' },
];

export const formSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: 'InputPassword',
  },
  {
    field: 'otpSecret',
    label: '谷歌验证码密钥',
    slot: 'googleQrcode',
  },
];

export const searchFormSchema: FormSchema[] = [];
