export interface AgentItem {
  // 代理唯一ID
  member_id: '';

  // 代理昵称
  member_nickname: '';

  // 会员账号
  member_username: '';

  // 头像地址
  member_portrait: '';

  // 账户状态
  member_status: '';

  // 在线状态
  member_online: '';

  // 上次登录时间
  next_time: '';

  // 创建时间
  create_time: '';

  // 代理级别
  level: '';

  // 上级代理名称
  parent_name: '';
}

/**
 * @description: Get menu return value
 */
export type getAgentListResultModel = AgentItem[];
