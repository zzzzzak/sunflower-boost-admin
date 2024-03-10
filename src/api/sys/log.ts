import { defHttp } from '@/utils/http/axios';

enum Api {
  getUserMoneyLogList = '/admin/v1/getUserMoneyLogList',
}

export const getUserMoneyLogList = (data) => {
  return defHttp.post({ url: Api.getUserMoneyLogList, data: data });
};
