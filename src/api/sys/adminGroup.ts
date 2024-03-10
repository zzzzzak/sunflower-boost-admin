import { defHttp } from '@/utils/http/axios';

enum Api {
  GetList = '/admin/v1/getAdminGroupList',
  UpdateData = '/admin/v1/UpgradeAdminGroup',
  AddData = '/admin/v1/AddAdminGroup',
  DeleteData = '/admin/v1/DeleteAdminGroup',
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
