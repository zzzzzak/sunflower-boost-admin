import { defHttp } from '@/utils/http/axios';

enum Api {
  GetList = '/admin/v1/getGameList',
  UpdateData = '/admin/v1/UpgradeGame',
  AddData = '/admin/v1/AddGame',
  GetGameRecord = '/admin/v1/getGameRecord',
  GetGameCategory = '/admin/v1/getGameCategory',
}

export const getList = (data) => {
  return defHttp.post({ url: Api.GetList, data: data });
};
export const updateData = (data) => {
  return defHttp.post({ url: Api.UpdateData, data: data });
};
export const addData = (data) => {
  return defHttp.post({ url: Api.AddData, data: data });
};
export const getGameRecord = (data) => {
  return defHttp.post({ url: Api.GetGameRecord, data: data });
};
export const getGameCategory = (data) => {
  return defHttp.post({ url: Api.GetGameCategory, data: data });
};
