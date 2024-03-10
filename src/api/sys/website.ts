import { defHttp } from '@/utils/http/axios';

enum Api {
  GetList = '/admin/v1/getWebSiteConfig',
  UpdateData = '/admin/v1/UpgradeSiteConfig',
}

export const getList = () => {
  return defHttp.post({ url: Api.GetList });
};
export const updateData = (data) => {
  return defHttp.post({ url: Api.UpdateData, data: data });
};
