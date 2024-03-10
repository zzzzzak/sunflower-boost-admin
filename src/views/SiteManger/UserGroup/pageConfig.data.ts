import { getMenuList } from '@/api/sys/menu';
import { BasicColumn, FormSchema } from '@/components/Table';

// 1启用 0禁用
const authStatusConfig = [
  { label: '启用', value: 1, color: 'green' },
  { label: '禁用', value: 0, color: 'red' },
];

export const columns: BasicColumn[] = [
  { dataIndex: 'auth_title', title: '用户组名称' },
  {
    dataIndex: 'auth_value',
    title: '可访问菜单值',
    customRender({ value }) {
      return Array.isArray(value) ? value.join(',') : value;
    },
  },
  { dataIndex: 'auth_remark', title: '备注' },
  { dataIndex: 'auth_status', title: '用户组状态', valueEnum: authStatusConfig },
  { dataIndex: 'auth_sort', title: '排序' },
  { dataIndex: 'release_time', title: '修改时间' },
  { dataIndex: 'create_time', title: '创建时间' },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '用户组名称',
    field: 'auth_title',
    component: 'Input',
  },
  {
    label: '用户组状态',
    field: 'auth_status',
    component: 'Select',
    componentProps: { options: authStatusConfig },
  },
];

export const accountFormSchema: FormSchema[] = [
  { field: 'auth_title', label: '用户组名称', component: 'Input', required: true },
  {
    field: 'auth_value',
    label: '可访问菜单值',
    component: 'ApiTreeSelect',
    componentProps({ formModel }) {
      return {
        onChange: (val) => {
          formModel.auth_value = val.map((item) => item.value);
        },
        async: true,
        multiple: true,
        treeCheckable: true,
        treeCheckStrictly: true,
        showArrow: true,
        api: async () => {
          const menuList = await getMenuList();
          function extractMeta(data) {
            data.forEach((item) => {
              const { meta, children } = item;
              if (meta) {
                Object.keys(meta).forEach((key) => {
                  item[key] = meta[key];
                });
                delete item.meta;
              }
              item.value = item.orderNo;
              if (children) {
                item.isLeaf = false;
                extractMeta(children);
              } else {
                item.isLeaf = true;
              }
            });
          }
          extractMeta(menuList);
          return menuList;
        },
        fieldNames: {
          children: 'children',
        },
      };
    },
    required: true,
  },
  { field: 'auth_remark', label: '备注', component: 'Input', required: true },
  {
    field: 'auth_status',
    label: '用户组状态',
    component: 'Switch',
    componentProps: { checkedValue: 1, unCheckedValue: 0 },
    required: true,
  },
  { field: 'auth_sort', label: '排序', component: 'Input', required: true },
];
