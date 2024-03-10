export interface MemberItem {
  member_id: '';
  member_nickname: '';
  member_username: '';
  member_portrait: '';
  member_balance: '';
  member_city: '';
  member_location: '';
  balance_status: '';
  member_certification: '';
  member_status: '';
  member_online: '';
  start_time: '';
  end_time: '';
  next_time: '';
  create_time: '';
  agent_name: '';
  agent_parent_name: '';
}

/**
 * @description: Get menu return value
 */
export type getMemberListResultModel = MemberItem[];
