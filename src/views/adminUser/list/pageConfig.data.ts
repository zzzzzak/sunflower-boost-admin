import { BasicColumn, FormSchema } from '@/components/Table';

// 通过上面实体配置生成以下页面配置：
export const columns: BasicColumn[] = [
  { dataIndex: 'id', title: 'ID' },
  { dataIndex: 'username', title: '用户名' },
  { dataIndex: 'createdAt', title: '创建时间' },
  { dataIndex: 'updatedAt', title: '更新时间' },
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
    componentProps: {
      placeholder: '密码留空为不修改',
    },
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: 'InputPassword',
    componentProps: {
      placeholder: '密码留空为不修改',
    },
  },
  {
    field: 'ipWhiteList',
    label: '访问IP白名单',
    component: 'Input',
    componentProps: {
      placeholder: '“*”或者留空不限制，多个请用英文,分割',
    },
  },
  {
    field: 'otpSecret',
    label: '谷歌验证码密钥',
    slot: 'googleQrcode',
  },
];

export const searchFormSchema: FormSchema[] = [];
