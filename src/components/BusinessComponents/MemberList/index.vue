<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :dropDownActions="[
              {
                icon: 'clarity:user-line',
                label: '团队成员',
                onClick: openUserListWindow.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <BasicModal destroy-on-close @register="registerUserListModal" title="用户信息" width="1200px">
      <Tabs
        destroyInactiveTabPane
        v-model:activeKey="activeKey"
        type="card"
        v-if="currentWithdrawalId"
      >
        <Tabs.TabPane key="all" tab="全部队员">
          <MemberList :useSearchForm="false" :inviter-id="currentWithdrawalId" level="all" />
        </Tabs.TabPane>
        <Tabs.TabPane :key="index" :tab="`${index}级队员`" v-for="index of 10">
          <MemberList :useSearchForm="false" :inviter-id="currentWithdrawalId" :level="index" />
        </Tabs.TabPane>
      </Tabs>
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import * as adminApi from '@/api/admin/index.ts';
  import { columns, searchFormSchema } from './pageConfig.data';
  import { ref } from 'vue';
  import { BasicModal, useModal } from '@/components/Modal';
  import { Tabs } from 'ant-design-vue';

  const props = defineProps({
    searchParams: {
      type: Object,
      default: null,
    },
    inviterId: {
      type: Number,
      default: null,
    },
    useSearchForm: {
      type: Boolean,
      default: true,
    },
    level: {
      type: [Number, String],
      default: null,
    },
  });

  const [registerTable] = useTable({
    title: '用户列表',
    canResize: false,
    isTreeTable: true,
    accordion: true, // 手风琴效果
    api: ({ toTime, ...params }) => {
      if (Array.isArray(toTime) && toTime.length) {
        params.toTime = toTime[0];
        params.formTime = toTime[1];
      }
      if (props.inviterId) {
        params.userId = props.inviterId;
        if (props.level === 'all') {
          return adminApi
            .getFansTreeByLevel({
              userId: props.inviterId,
            })
            .then((data) => {
              function deepRename(_data) {
                return _data.map((item) => {
                  if (item.invitedUsers.length) {
                    item.children = deepRename(item.invitedUsers);
                  }
                  return item;
                });
              }
              const tempData = deepRename(data);
              console.log(tempData);
              return tempData;
            });
        } else {
          return adminApi.getFansByLevel({
            level: props.level || 1,
            ...params,
          });
        }
      }
      return adminApi.getUserList({
        ...(props.searchParams || {}),
        ...params,
      });
    },

    useSearchForm: props.useSearchForm,
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    // rowKey: 'rowKey',
    // rowSelection: {
    //   type: 'checkbox',
    // },
    // showSelectionBar: true, // 显示多选状态栏
    formConfig: {
      schemas: searchFormSchema,
    },
    rowKey: 'id',
    actionColumn: {
      width: 80,
      title: '操作',
      fixed: 'right',
      dataIndex: 'action',
    },
    columns: [
      { dataIndex: 'id', title: 'ID', align: 'left', width: props.level === 'all' ? 300 : 80 },
      ...columns,
    ],
  });

  const currentWithdrawalId = ref(null);
  function openUserListWindow(data) {
    openUserListModal();
    currentWithdrawalId.value = data?.id;
  }
  const [registerUserListModal, { openModal: openUserListModal }] = useModal();

  const activeKey = ref('all');
</script>

<script lang="ts">
  export default {
    name: 'MemberList',
  };
</script>
