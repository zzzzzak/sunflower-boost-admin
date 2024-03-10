import { defHttp } from '@/utils/http/axios';

enum Api {
  GetList = '/admin/v1/getCommercial',
  UpdateData = '/admin/v1/UpgradeCommercial',
  AddData = '/admin/v1/AddCommercial',
  DeleteData = '/admin/v1/DeleteCommercial',
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
