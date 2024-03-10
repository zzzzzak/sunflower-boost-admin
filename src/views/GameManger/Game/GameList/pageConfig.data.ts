import { uploadApi } from '@/api/sys/upload';
import { BasicColumn, FormSchema } from '@/components/Table';
import { getGameCategory } from '@/api/sys/game';
/**
 * table 数据描述
 * id	string  数据id
 * platform_name	string  平台名称
 * name	string  游戏名称
 * game_code	string  游戏code
 * category_id	string  分类
 * order_by	number  排序
 * is_hot	number  热门游戏 1是 0否
 * is_new	number  最新游戏 1是 0否
 * is_recommend	number  推荐游戏 1是 0否
 * mobile_img	number  手机封面图
 * is_top	number  状态 1启用 0隐藏
 * wallet_type	number  钱包类型：1转账，0单一
 * create_time	string  创建时间
 *
 * searchForm 数据描述
 * category	string  游戏分类
 * is_top	number  状态 1启用 0隐藏
 * name	string 游戏名称
 *
 * form 数据描述
 * platform_name	string  平台名称
 * name	string  游戏名称
 * game_code	string  游戏code
 * category_id	string  分类
 * order_by	number  排序
 * is_hot	number  热门游戏 1是 0否
 * is_new	number  最新游戏 1是 0否
 * is_recommend	number  推荐游戏 1是 0否
 * mobile_img	number  手机封面图
 * is_top	number  状态 1启用 0隐藏
 * wallet_type	number  钱包类型：1转账，0单一
 *
 * 先创建枚举值，然后创建columns，最后创建searchFormSchema和formSchema
 * 枚举值格式为[{label:'xxx', value:xxx, color: '***'}]
 * 枚举值需要转换成valueEnum，color颜色只有类似禁用这种警告相关的才需要用red，通常“否”使用lightgray
 * 在表单配置参考FormSchema使用恰当组件，图片上传使用ImageUpload组件上传使用api接口uploadApi
 */
export const gameStatusConfig = [
  { label: '启用', value: 1, color: 'green' },
  { label: '隐藏', value: 0, color: 'red' },
];
export const gameHotConfig = [
  { label: '是', value: 1, color: 'green' },
  { label: '否', value: 0, color: 'lightgray' },
];
export const gameNewConfig = [
  { label: '是', value: 1, color: 'green' },
  { label: '否', value: 0, color: 'lightgray' },
];
export const gameRecommendConfig = [
  { label: '是', value: 1, color: 'green' },
  { label: '否', value: 0, color: 'lightgray' },
];
export const gameWalletTypeConfig = [
  { label: '转账', value: 1, color: 'yellow' },
  { label: '单一', value: 0, color: 'orange' },
];

export const columns: BasicColumn[] = [
  { title: '游戏ID', dataIndex: 'id' },
  { title: '平台名称', dataIndex: 'platform_name' },
  { title: '游戏名称', dataIndex: 'name' },
  { title: '游戏code', dataIndex: 'game_code' },
  {
    title: '分类',
    dataIndex: 'category_id',
    asyncValueEnum: async () => {
      return getGameCategory({ pageIndex: 1, pageSize: 1000 }).then((data) => {
        const options = data.map((item) => {
          return {
            label: item.name,
            value: item.enname,
          };
        });
        return options;
      });
    },
  },
  { title: '排序', dataIndex: 'order_by' },
  {
    title: '热门游戏',
    dataIndex: 'is_hot',
    valueEnum: gameHotConfig,
  },
  {
    title: '最新游戏',
    dataIndex: 'is_new',
    valueEnum: gameNewConfig,
  },
  {
    title: '推荐游戏',
    dataIndex: 'is_recommend',
    valueEnum: gameRecommendConfig,
  },
  { title: '手机封面图', dataIndex: 'mobile_img' },
  {
    title: '状态',
    dataIndex: 'is_top',
    valueEnum: gameStatusConfig,
  },
  {
    title: '钱包类型',
    dataIndex: 'wallet_type',
    valueEnum: gameWalletTypeConfig,
  },
  { title: '创建时间', dataIndex: 'create_time' },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '游戏分类',
    field: 'category',
    component: 'ApiSelect',
    componentProps: {
      api: getGameCategory,
      resultField: 'list',
      valueField: 'enname',
      labelField: 'name',
      params: {
        pageIndex: 1,
        pageSize: 1000,
      },
    },
  },
  {
    label: '状态',
    field: 'is_top',
    component: 'Select',
    componentProps: {
      options: gameStatusConfig,
    },
  },
  { label: '游戏名称', field: 'name', component: 'Input' },
];

export const formSchema: FormSchema[] = [
  { label: '平台名称', field: 'platform_name', component: 'Input', required: true },
  { label: '游戏名称', field: 'name', component: 'Input', required: true },
  { label: '游戏code', field: 'game_code', component: 'Input', required: true },
  {
    label: '分类',
    field: 'category_id',
    component: 'ApiSelect',
    componentProps: {
      api: getGameCategory,
      resultField: 'list',
      valueField: 'enname',
      labelField: 'name',
      params: {
        pageIndex: 1,
        pageSize: 1000,
      },
    },
    required: true,
  },
  { label: '排序', field: 'order_by', component: 'Input', required: true },
  {
    label: '热门游戏',
    field: 'is_hot',
    component: 'RadioGroup',
    componentProps: {
      options: gameHotConfig,
    },
    required: true,
  },
  {
    label: '最新游戏',
    field: 'is_new',
    component: 'RadioGroup',
    componentProps: {
      options: gameNewConfig,
    },
    required: true,
  },
  {
    label: '推荐游戏',
    field: 'is_recommend',
    component: 'RadioGroup',
    componentProps: {
      options: gameRecommendConfig,
    },
    required: true,
  },
  {
    label: '手机封面图',
    field: 'mobile_img',
    component: 'ImageUpload',
    componentProps: {
      api: uploadApi,
      maxNumber: 1,
    },
    required: true,
  },
  {
    label: '状态',
    field: 'is_top',
    component: 'RadioGroup',
    componentProps: {
      options: gameStatusConfig,
    },
    required: true,
  },
  {
    label: '钱包类型',
    field: 'wallet_type',
    component: 'RadioGroup',
    componentProps: {
      options: gameWalletTypeConfig,
    },
    required: true,
  },
];
