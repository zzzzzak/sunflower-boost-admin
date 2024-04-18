import { uploadApi } from '@/api/sys/upload';
import { FormSchema } from '@/components/Form';
import { useUserStore } from '@/store/modules/user';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  // {
  //   key: '2',
  //   name: '安全设置',
  //   component: 'SecureSetting',
  // },
  // {
  //   key: '3',
  //   name: '账号绑定',
  //   component: 'AccountBind',
  // },
  // {
  //   key: '4',
  //   name: '新消息通知',
  //   component: 'MsgNotify',
  // },
];

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  // { label: '项目名称', field: 'projectName', component: 'Input' },

  // { label: '项目描述', field: 'projectDescription', component: 'InputTextArea' },

  // {
  //   label: '项目logo',

  //   field: 'projectLogo',
  //   component: 'ImageUpload',
  //   componentProps: {
  //     api: uploadApi,
  //   },
  // },
  {
    label: 'm1/m2同级烧伤机制',

    field: 'burnMechanism',
    component: 'Switch',
    componentProps: {
      checkedChildren: '开',
      unCheckedChildren: '关',
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    label: '每日静态资金分红比例',

    field: 'staticPoolRatio',
    component: 'InputNumber',
    componentProps: {
      step: 0.01,
      min: 0,
      max: 1,
    },
  },
  {
    label: '静态资金结算时间',

    field: 'staticPoolSettleTime',
    component: 'TimePicker',
    componentProps: {
      valueFormat: 'HH:mm:ss',
      format: 'HH:mm:ss',
    },
  },
  { label: '最小提现额度', field: 'minWithdrawalAmount', component: 'InputNumber' },
  {
    label: '提现手续费BNB(0为不收取)',
    field: 'withdrawalFee',
    component: 'InputNumber',
    componentProps: {
      step: 0.001,
      min: 0,
    },
  },

  // {
  //   label: '提现审批',

  //   field: 'withdrawalReview',
  //   component: 'Switch',
  //   componentProps: {
  //     checkedChildren: '开',
  //     unCheckedChildren: '关',
  //     checkedValue: 1,
  //     unCheckedValue: 0,
  //   },
  // },

  {
    label: '币安付款钱包私钥',
    field: 'secretKey',
    component: 'Input',
    required: false,
    ifShow() {
      const userStore = useUserStore();
      return !!userStore.userInfo.writeBscPrivateKey;
    },
    componentProps({ formModel }) {
      return {
        placeholder: formModel._secretKey,
      };
    },
  },
  {
    label: '币安钱包私钥',
    field: '_secretKey',
    component: 'Input',
    required: false,
    ifShow() {
      return false;
    },
  },

  {
    label: '币安收款地址',
    field: 'bscAddress',
    component: 'Input',
    required: false,
    ifShow() {
      const userStore = useUserStore();
      return !!userStore.userInfo.writeBscPrivateKey;
    },
    componentProps({ formModel }) {
      return {
        placeholder: formModel._bscAddress,
      };
    },
  },
  {
    label: '币安收款地址',
    field: '_bscAddress',
    component: 'Input',
    required: false,
    ifShow() {
      return false;
    },
  },
];

// 安全设置 list
export const secureSettingList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '当前密码强度：：强',
    extra: '修改',
  },
  {
    key: '2',
    title: '密保手机',
    description: '已绑定手机：：138****8293',
    extra: '修改',
  },
  {
    key: '3',
    title: '密保问题',
    description: '未设置密保问题，密保问题可有效保护账户安全',
    extra: '修改',
  },
  {
    key: '4',
    title: '备用邮箱',
    description: '已绑定邮箱：：ant***sign.com',
    extra: '修改',
  },
  {
    key: '5',
    title: 'MFA 设备',
    description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
    extra: '修改',
  },
];

// 账号绑定 list
export const accountBindList: ListItem[] = [
  {
    key: '1',
    title: '绑定淘宝',
    description: '当前未绑定淘宝账号',
    extra: '绑定',
    avatar: 'ri:taobao-fill',
    color: '#ff4000',
  },
  {
    key: '2',
    title: '绑定支付宝',
    description: '当前未绑定支付宝账号',
    extra: '绑定',
    avatar: 'fa-brands:alipay',
    color: '#2eabff',
  },
  {
    key: '3',
    title: '绑定钉钉',
    description: '当前未绑定钉钉账号',
    extra: '绑定',
    avatar: 'ri:dingding-fill',
    color: '#2eabff',
  },
];

// 新消息通知 list
export const msgNotifyList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '其他用户的消息将以站内信的形式通知',
  },
  {
    key: '2',
    title: '系统消息',
    description: '系统消息将以站内信的形式通知',
  },
  {
    key: '3',
    title: '待办任务',
    description: '待办任务将以站内信的形式通知',
  },
];
