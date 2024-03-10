import { defHttp } from '@/utils/http/axios';

enum Api {
  GetList = '/admin/v1/getAdminMemberList',
  UpdateData = '/admin/v1/UpgradeAdminMember',
  AddData = '/admin/v1/AddAdminMember',
  DeleteData = '/admin/v1/DeleteAdminMember',
  CreateGoogleKey = '/admin/v1/CreateGoogleKey',
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
export const createGoogleKey = () => {
  return defHttp.post({ url: Api.CreateGoogleKey });
};
