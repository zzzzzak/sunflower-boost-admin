import { defHttp } from '@/utils/http/axios';

enum Api {
  GetList = '/admin/v1/getMemberList',
  UpdateData = '/admin/v1/UpgradeMember',
  AddData = '/admin/v1/AddMember',
  DeleteData = '/admin/v1/DeleteMember',
  ChangeBalance = '/admin/v1/ChangeBalance',
  ChangeJackpot = '/admin/v1/ChangeJackpot',
  ExchangeBalance = '/admin/v1/ExchangeBalance',
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
