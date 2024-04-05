import { defHttp } from '@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '#/axios';

enum Api {
  Login = '/admin-user/login',
  Logout = '/admin/Logout',
  GetUserInfo = '/admin-user/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  GetAdminAnalysis = '/analysis/getAnalysis',
  GetMemberAnalysis = '/admin/getMemberAnalysis',
  getAgentAnalysis = '/admin/getAgentAnalysis',
  getAgentMemberAnalysis = '/admin/getAgentMemberAnalysis',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.post<GetUserInfoModel>({ url: Api.GetUserInfo }).then((res) => {
    if (res.roles && res.roles.length > 0) {
      res.roles = [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ];
    }
    return res;
  });
}

export function getPermCode() {
  // return defHttp.post<string[]>({ url: Api.GetPermCode });
  return ['*'];
}

export function doLogout() {
  return defHttp.post({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.post(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}

export function getAdminAnalysis(data) {
  return defHttp.post({ url: Api.GetAdminAnalysis, data });
}
export const getMemberAnalysis = (data) => {
  return defHttp.post({ url: Api.GetMemberAnalysis, data: data });
};

export function getAgentAnalysis(data) {
  return defHttp.post({ url: Api.getAgentAnalysis, data });
}
export function getAgentMemberAnalysis(data) {
  return defHttp.post({ url: Api.getAgentMemberAnalysis, data });
}
