import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from 'types/axios';

enum Api {
  Logout = '/admin/admin-user/logout',
  Login = '/admin/admin-user/login',
  GoogleQrcode = '/auth/googleQrcode',
  GetUploadPath = '/upload/getUploadPath',
  GetUserInfo = '/admin/admin-user/getUserInfo',
  AdminUserCreate = '/admin/admin-user/create',
  AdminUserList = '/admin/admin-user/listpage',
  AdminUserDetail = '/admin/admin-user/detail',
  AdminUserUpdate = '/admin/admin-user/update',
  AdminUserDelete = '/admin/admin-user/delete',

  GetUserList = '/admin/getUserList',
  GetFansByLevel = '/admin/getFansByLevel',
  GetFansTreeByLevel = '/admin/getFansTreeByLevel',
  userCreate = '/admin/user/create',
  userUpdate = '/admin/user/update',
  userDelete = '/admin/user/delete',
  userForfeitedBalance = '/admin/user/forfeitedBalance',

  GetMenuList = '/admin/menu/getMenuList',

  // 等级
  LevelListpage = '/admin/level/listpage',
  LevelCreate = '/admin/level/create',
  LevelList = '/admin/level/list',
  LevelDetail = '/admin/level/detail',
  LevelUpdate = '/admin/level/update',
  LevelDelete = '/admin/level/delete',

  // 代理等级规则
  InviterProfitRuleListpage = '/admin/inviterProfitRule/listpage',
  InviterProfitRuleCreate = '/admin/inviterProfitRule/create',
  InviterProfitRuleList = '/admin/inviterProfitRule/list',
  InviterProfitRuleDetail = '/admin/inviterProfitRule/detail',
  InviterProfitRuleUpdate = '/admin/inviterProfitRule/update',
  InviterProfitRuleDelete = '/admin/inviterProfitRule/delete',

  // 公告
  NoticeListpage = '/admin/notice/listpage',
  NoticeCreate = '/admin/notice/create',
  NoticeList = '/admin/notice/list',
  NoticeDetail = '/admin/notice/detail',
  NoticeUpdate = '/admin/notice/update',
  NoticeDelete = '/admin/notice/delete',

  // API日志
  ApiLogListpage = '/admin/apiLog/listpage',
  ApiLogList = '/admin/apiLog/list',
  ApiLogDetail = '/admin/apiLog/detail',
  ApiLogDelete = '/admin/apiLog/delete',

  // 慈善等级
  CharityRoleListpage = '/admin/charityRole/listpage',
  CharityRoleCreate = '/admin/charityRole/create',
  CharityRoleList = '/admin/charityRole/list',
  CharityRoleDetail = '/admin/charityRole/detail',
  CharityRoleUpdate = '/admin/charityRole/update',
  CharityRoleDelete = '/admin/charityRole/delete',

  // 提现
  WithdrawalListpage = '/admin/detail/withdrawal/listpage',
  WithdrawalDetail = '/admin/detail/withdrawal/detail',
  WithdrawalUpdate = '/admin/detail/withdrawal/update',
  WithdrawalDelete = '/admin/detail/withdrawal/delete',
  WithdrawalReTransfer = '/admin/detail/withdrawal/retransfer',
  WithdrawalRefaush = '/admin/detail/withdrawal/refaush',

  // 充值订单
  orderListpage = '/admin/detail/order/listpage',
  orderDetail = '/admin/detail/order/detail',
  orderDelete = '/admin/detail/order/delete',
  orderReProfitSharing = '/admin/detail/order/reProfitSharing',

  // 分润订单
  profitListpage = '/admin/detail/commission/listpage',
  profitDetail = '/admin/detail/commission/detail',
  profitDelete = '/admin/detail/commission/delete',

  // 静态池订单
  staticPoolListpage = '/admin/detail/staticPool/listpage',
  staticPoolDetail = '/admin/detail/staticPool/detail',
  staticPoolDelete = '/admin/detail/staticPool/delete',

  // 慈善金订单
  charityListpage = '/admin/detail/charity/listpage',
  charityDetail = '/admin/detail/charity/detail',
  charityDelete = '/admin/detail/charity/delete',

  systemConfigDetail = '/admin/systemConfig/detail',
  systemConfigUpdate = '/admin/systemConfig/update',

  GetAdminAnalysis = '/admin/analysis/getAnalysis',
}

export function loginApi(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post({ url: Api.Login, params }, { errorMessageMode: mode });
}

export function googleQrcode(params) {
  return defHttp.get({ url: Api.GoogleQrcode, params });
}

export function GetUploadPath(data) {
  return defHttp.post({ url: Api.GetUploadPath, data });
}

export function doLogout() {
  return defHttp.post({ url: Api.Logout });
}

export function getUserInfo() {
  return defHttp.get({ url: Api.GetUserInfo }).then((res) => {
    // if (res.roles && res.roles.length > 0) {
    //   res.roles = [
    //     {
    //       roleName: 'Super Admin',
    //       value: 'super',
    //     },
    //   ];
    // }
    return res;
  });
}
export function getAdminAnalysis(data) {
  return defHttp.post({ url: Api.GetAdminAnalysis, data });
}

export const getUserList = (params) => {
  return defHttp.get({ url: Api.GetUserList, params }, { isTransformResponse: false });
};

export const getFansByLevel = (params) => {
  return defHttp.get({ url: Api.GetFansByLevel, params }, { isTransformResponse: false });
};
export const getFansTreeByLevel = (params) => {
  return defHttp.get({ url: Api.GetFansTreeByLevel, params });
};
export const userCreate = (params) => {
  return defHttp.post({ url: Api.userCreate, params });
};
export const userUpdate = (params) => {
  return defHttp.post({ url: Api.userUpdate, params });
};
export const userDelete = (params) => {
  return defHttp.post({ url: Api.userDelete, params });
};
export const userForfeitedBalance = (params) => {
  return defHttp.post({ url: Api.userForfeitedBalance, params });
};

export const levelListPage = (params) => {
  return defHttp.get({ url: Api.LevelListpage, params }, { isTransformResponse: false });
};
export const levelCreate = (params) => {
  return defHttp.post({ url: Api.LevelCreate, params });
};
export const levelList = (params?: any) => {
  return defHttp.get({ url: Api.LevelList, params });
};
export const levelDetail = (params) => {
  return defHttp.get({ url: Api.LevelDetail, params });
};
export const levelUpdate = (params) => {
  return defHttp.post({ url: Api.LevelUpdate, params });
};
export const levelDelete = (params) => {
  return defHttp.post({ url: Api.LevelDelete, params });
};

export const inviterProfitRuleListPage = (params) => {
  return defHttp.get(
    { url: Api.InviterProfitRuleListpage, params },
    { isTransformResponse: false },
  );
};
export const inviterProfitRuleCreate = (params) => {
  return defHttp.post({ url: Api.InviterProfitRuleCreate, params });
};
export const inviterProfitRuleList = (params?: any) => {
  return defHttp.get({ url: Api.InviterProfitRuleList, params });
};
export const inviterProfitRuleDetail = (params) => {
  return defHttp.get({ url: Api.InviterProfitRuleDetail, params });
};
export const inviterProfitRuleUpdate = (params) => {
  return defHttp.post({ url: Api.InviterProfitRuleUpdate, params });
};
export const inviterProfitRuleDelete = (params) => {
  return defHttp.post({ url: Api.InviterProfitRuleDelete, params });
};

export const noticeListPage = (params) => {
  return defHttp.get({ url: Api.NoticeListpage, params }, { isTransformResponse: false });
};
export const noticeCreate = (params) => {
  return defHttp.post({ url: Api.NoticeCreate, params });
};
export const noticeList = (params?: any) => {
  return defHttp.get({ url: Api.NoticeList, params });
};
export const noticeDetail = (params) => {
  return defHttp.get({ url: Api.NoticeDetail, params });
};
export const noticeUpdate = (params) => {
  return defHttp.post({ url: Api.NoticeUpdate, params });
};
export const noticeDelete = (params) => {
  return defHttp.post({ url: Api.NoticeDelete, params });
};

export const apiLogListPage = (params) => {
  return defHttp.get({ url: Api.ApiLogListpage, params }, { isTransformResponse: false });
};
export const apiLogList = (params?: any) => {
  return defHttp.get({ url: Api.ApiLogList, params });
};
export const apiLogDetail = (params) => {
  return defHttp.get({ url: Api.ApiLogDetail, params });
};
export const apiLogDelete = (params) => {
  return defHttp.post({ url: Api.ApiLogDelete, params });
};

export const charityRoleListPage = (params) => {
  return defHttp.get({ url: Api.CharityRoleListpage, params }, { isTransformResponse: false });
};
export const charityRoleCreate = (params) => {
  return defHttp.post({ url: Api.CharityRoleCreate, params });
};
export const charityRoleList = (params?: any) => {
  return defHttp.get({ url: Api.CharityRoleList, params });
};
export const charityRoleDetail = (params) => {
  return defHttp.get({ url: Api.CharityRoleDetail, params });
};
export const charityRoleUpdate = (params) => {
  return defHttp.post({ url: Api.CharityRoleUpdate, params });
};
export const charityRoleDelete = (params) => {
  return defHttp.post({ url: Api.CharityRoleDelete, params });
};

export const adminUserCreate = (params) => {
  return defHttp.post({ url: Api.AdminUserCreate, params });
};
export const adminUserListPage = (params?: any) => {
  return defHttp.get({ url: Api.AdminUserList, params }, { isTransformResponse: false });
};
export const adminUserDetail = (params) => {
  return defHttp.get({ url: Api.AdminUserDetail, params });
};
export const adminUserUpdate = (params) => {
  return defHttp.post({ url: Api.AdminUserUpdate, params });
};
export const adminUserDelete = (params) => {
  return defHttp.post({ url: Api.AdminUserDelete, params });
};

export const withdrawalListPage = (params?: any) => {
  return defHttp.get({ url: Api.WithdrawalListpage, params }, { isTransformResponse: false });
};
export const withdrawalDetail = (params) => {
  return defHttp.get({ url: Api.WithdrawalDetail, params });
};
export const withdrawalUpdate = (params) => {
  return defHttp.post({ url: Api.WithdrawalUpdate, params });
};
export const withdrawalDelete = (params) => {
  return defHttp.post({ url: Api.WithdrawalDelete, params });
};
export const withdrawalReTransfer = (params) => {
  return defHttp.post({ url: Api.WithdrawalReTransfer, params });
};
export const withdrawalRefaush = (params) => {
  return defHttp.post({ url: Api.WithdrawalRefaush, params });
};

export const orderListPage = (params?: any) => {
  return defHttp.get({ url: Api.orderListpage, params }, { isTransformResponse: false });
};
export const orderDetail = (params) => {
  return defHttp.get({ url: Api.orderDetail, params });
};
export const orderDelete = (params) => {
  return defHttp.post({ url: Api.orderDelete, params });
};
export const orderReProfitSharing = (params) => {
  return defHttp.post({ url: Api.orderReProfitSharing, params });
};

export const profitListPage = (params?: any) => {
  return defHttp.get({ url: Api.profitListpage, params }, { isTransformResponse: false });
};
export const profitDetail = (params) => {
  return defHttp.get({ url: Api.profitDetail, params });
};
export const profitDelete = (params) => {
  return defHttp.post({ url: Api.profitDelete, params });
};

export const staticPoolListPage = (params?: any) => {
  return defHttp.get({ url: Api.staticPoolListpage, params }, { isTransformResponse: false });
};
export const staticPoolDetail = (params) => {
  return defHttp.get({ url: Api.staticPoolDetail, params });
};
export const staticPoolDelete = (params) => {
  return defHttp.post({ url: Api.staticPoolDelete, params });
};

export const charityListpage = (params?: any) => {
  return defHttp.get({ url: Api.charityListpage, params }, { isTransformResponse: false });
};
export const charityDetail = (params) => {
  return defHttp.get({ url: Api.charityDetail, params });
};
export const charityDelete = (params) => {
  return defHttp.post({ url: Api.charityDelete, params });
};

export const systemConfigDetail = () => {
  return defHttp.get({ url: Api.systemConfigDetail });
};
export const systemConfigUpdate = (data) => {
  return defHttp.post({ url: Api.systemConfigUpdate, data });
};

export const getMenuList = () => {
  return defHttp.get({ url: Api.GetMenuList });
};
