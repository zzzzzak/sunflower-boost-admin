import { defHttp } from '@/utils/http/axios';

enum Api {
  GetList = '/admin/v1/getWithdrawalList',
  UpdateData = '/admin/v1/UpgradeWithdrawal',
  AudioData = '/admin/v1/AuthWithdrawal',
  // AddData = '/admin/v1/AddWithdrawal',
}

export const getList = (data) => {
  return defHttp.post({ url: Api.GetList, data: data });
};
export const updateData = (data) => {
  return defHttp.post({ url: Api.UpdateData, data: data });
};
// export const addData = (data) => {
//   return defHttp.post({ url: Api.AddData, data: data });
// };
export const audioData = (data) => {
  return defHttp.post({ url: Api.AudioData, data: data });
};
