import { defHttp } from '@/utils/http/axios';

enum Api {
  GetList = '/admin/v1/getRechangeOrderAuthList',
  UpdateData = '/admin/v1/AuthRechangeOrder',
  AddData = '/admin/v1/CreateRechangeOrder',
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
