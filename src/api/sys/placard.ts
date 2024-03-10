import { defHttp } from '@/utils/http/axios';

enum Api {
  GetList = '/admin/v1/getPlacardList',
  UpdateData = '/admin/v1/UpgradePlacard',
  AddData = '/admin/v1/AddPlacard',
  DeleteData = '/admin/v1/DeletePlacard',
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
