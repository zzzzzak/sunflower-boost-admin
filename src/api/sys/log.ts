import { defHttp } from '@/utils/http/axios';

enum Api {
  getUserMoneyLogList = '/admin/v1/getUserMoneyLogList',
  getSmsSendList = '/admin/v1/getSmsSendList',
}

export const getUserMoneyLogList = (data) => {
  return defHttp.post({ url: Api.getUserMoneyLogList, data: data });
};
export const getSmsSendList = (data) => {
  return defHttp.post({ url: Api.getSmsSendList, data: data });
};
