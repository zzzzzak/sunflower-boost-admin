import { defHttp } from '@/utils/http/axios';

enum Api {
  GetList = '/admin/v1/getSwipeList',
  UpdateData = '/admin/v1/UpgradeSwipe',
  AddData = '/admin/v1/AddSwipe',
  DeleteData = '/admin/v1/DeleteSwipe',
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
