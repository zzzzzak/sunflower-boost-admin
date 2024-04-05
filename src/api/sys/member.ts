import { defHttp } from '@/utils/http/axios';

enum Api {
  GetList = '/user',
  UpdateData = '/admin/v1/UpgradeMember',
  AddData = '/admin/v1/AddMember',
  DeleteData = '/admin/v1/DeleteMember',
  ChangeBalance = '/admin/v1/ChangeBalance',
  ChangeJackpot = '/admin/v1/ChangeJackpot',
  ExchangeBalance = '/admin/v1/ExchangeBalance',

  getUserApi = '/admin/v1/getUserApi',
  getApiBalance = '/admin/v1/getApiBalance',
  RecycleApiBalance = '/admin/v1/RecycleApiBalance',
  ExportMemberReport = '/admin/v1/ExportMemberReport',
}

export const getList = (params) => {
  return defHttp.get(
    { url: Api.GetList, params },
    {
      isTransformResponse: false,
    },
  );
};
export const updateData = (data) => {
  return defHttp.post({ url: Api.UpdateData, data: data });
};
export const addData = (data) => {
  return defHttp.post({ url: Api.AddData, data: data });
};
export const deleteData = (data) => {
  return defHttp.post({ url: Api.DeleteData, data: data });
};
export const changeBalance = (data) => {
  return defHttp.post({ url: Api.ChangeBalance, data: data });
};
export const changeJackpot = (data) => {
  return defHttp.post({ url: Api.ChangeJackpot, data: data });
};
export const exchangeBalance = (data) => {
  return defHttp.post({ url: Api.ExchangeBalance, data: data });
};
export const getUserApi = (data) => {
  return defHttp.post({ url: Api.getUserApi, data: data });
};
export const getApiBalance = (data) => {
  return defHttp.post({ url: Api.getApiBalance, data: data });
};
export const recycleApiBalance = (data) => {
  return defHttp.post({ url: Api.RecycleApiBalance, data: data });
};
export const exportMemberReport = (data) => {
  return defHttp.post({ url: Api.ExportMemberReport, data: data });
};
