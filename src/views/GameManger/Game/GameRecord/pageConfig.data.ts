import { BasicColumn, FormSchema } from '@/components/Table';
import { getGameCategory } from '@/api/sys/game';
/**
 * columns 数据描述
 * id	string  数据id
 * member_id	number  用户id
 * member_username	string  用户名
 * bet_id	string  注单id
 * bet_code	string  注单code
 * bet_time	string  下注时间
 * settle_time	string  结算时间
 * platform_type	string  游戏平台
 * game_type	string  游戏类型
 * game_code	string  游戏code
 * bet_amount	string  下注金额
 * valid_amount	number  有效投注金额
 * win_loss	number  输赢金额
 * is_back	number  1已反水 0未反水
 * status	number  状态 1已结算 2未结算 0无效注单
 * today_date	number  日期
 * create_time	string  创建时间
 *
 * searchFormSchema 数据描述
 * game_type	string  游戏分类
 * platform_type	string  平台
 * member_username	string  用户名
 *
 * 先创建枚举值，然后创建columns，最后创建searchFormSchema和formSchema
 * 枚举值格式为[{label:'xxx', value:xxx, color: '***'}]
 * 枚举值需要转换成valueEnum，color颜色只有类似禁用这种警告相关的才需要用red，通常“否”使用lightgray
 * 在表单配置参考FormSchema使用恰当组件，图片上传使用ImageUpload组件上传使用api接口uploadApi
 * 游戏分类枚举用getGameCategory这个接口获取
 */
export const gameStatusConfig = [
  { label: '已结算', value: 1, color: 'green' },
  { label: '未结算', value: 2, color: 'red' },
  { label: '无效注单', value: 0, color: 'lightgray' },
];
export const gameBackConfig = [
  { label: '已反水', value: 1, color: 'green' },
  { label: '未反水', value: 0, color: 'lightgray' },
];
export const columns: BasicColumn[] = [
  { title: 'ID', dataIndex: 'id' },
  { title: '用户ID', dataIndex: 'member_id' },
  { title: '用户名', dataIndex: 'member_username' },
  { title: '注单ID', dataIndex: 'bet_id' },
  { title: '注单code', dataIndex: 'bet_code' },
  { title: '下注时间', dataIndex: 'bet_time' },
  { title: '结算时间', dataIndex: 'settle_time' },
  { title: '游戏平台', dataIndex: 'platform_type' },
  { title: '游戏类型', dataIndex: 'game_type' },
  { title: '游戏code', dataIndex: 'game_code' },
  { title: '下注金额', dataIndex: 'bet_amount' },
  { title: '有效投注金额', dataIndex: 'valid_amount' },
  { title: '输赢金额', dataIndex: 'win_loss' },
  { title: '是否反水', dataIndex: 'is_back', valueEnum: gameBackConfig },
  { title: '状态', dataIndex: 'status', valueEnum: gameStatusConfig },
  { title: '日期', dataIndex: 'today_date' },
  { title: '创建时间', dataIndex: 'create_time' },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'game_type',
    label: '游戏分类',
    component: 'ApiSelect',
    componentProps: {
      api: getGameCategory,
      labelField: 'name',
      valueField: 'id',
    },
  },
  { field: 'platform_type', label: '平台', component: 'Input' },
  { field: 'member_username', label: '用户名', component: 'Input' },
];
