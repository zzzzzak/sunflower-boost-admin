import { defHttp } from '@/utils/http/axios';
import { getAgentListResultModel } from './model/agentModel';

enum Api {
  GetList = '/admin/v1/getAgentList',
  UpdateData = '/admin/v1/UpgradeAgent',
  AddData = '/admin/v1/AddAgent',
  DeleteData = '/admin/v1/DeleteAgent',
  GetAgentAnalysis = '/admin/v1/getAgentAnalysis',
}

export const getList = (data) => {
  return defHttp.post<getAgentListResultModel>({ url: Api.GetList, data: data });
};
export const updateData = (data) => {
  return defHttp.post<getAgentListResultModel>({ url: Api.UpdateData, data: data });
};
export const addData = (data) => {
  return defHttp.post<getAgentListResultModel>({ url: Api.AddData, data: data });
};
export const deleteData = (data) => {
  return defHttp.post<getAgentListResultModel>({ url: Api.DeleteData, data: data });
};
export const getAgentAnalysis = (data) => {
  return defHttp.post({ url: Api.GetAgentAnalysis, data });
};
