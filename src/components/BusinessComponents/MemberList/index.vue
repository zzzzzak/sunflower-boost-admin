<template>
  <div>
    <div class="flex flex-wrap" v-if="inviterId">
      <Card size="small" class="md:w-1/4 w-1/2" title="团队业绩">
        <div class="py-4 px-4 flex justify-between items-center">
          <div class="text-2xl">{{ totalData.investmentAmount.toFixed(2) }}</div>
        </div>
      </Card>
      <Card size="small" class="md:w-1/4 w-1/2" title="团队收益">
        <div class="py-4 px-4 flex justify-between items-center">
          <div class="text-2xl">{{ totalData.earningsAmount.toFixed(2) }}</div>
        </div>
      </Card>
      <Card size="small" class="md:w-1/4 w-1/2" title="团队人数">
        <div class="py-4 px-4 flex justify-between items-center">
          <div class="text-2xl">{{ totalData.totalCount }}</div>
        </div>
      </Card>
      <Card size="small" class="md:w-1/4 w-1/2" title="团队慈善值">
        <div class="py-4 px-4 flex justify-between items-center">
          <div class="text-2xl">{{ totalData.charityAmount.toFixed(2) }}</div>
        </div>
      </Card>
    </div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" v-if="!inviterId" v-auth="RoleEnum.SUPER" @click="handleCreate"
          >新增种子用户</a-button
        >
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :dropDownActions="[
              {
                icon: 'clarity:user-line',
                label: '团队成员',
                onClick: openUserListWindow.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                label: '修改信息',
                onClick: handleEdit.bind(null, record),
                auth: RoleEnum.SUPER,
              },
              {
                icon: 'clarity:ban-line',
                label: '没收金额',
                onClick: handleForfeitedBalance.bind(null, record),
                auth: RoleEnum.SUPER,
              },
              {
                icon: 'clarity:trash-line',
                label: '删除用户',
                type: 'primary',
                auth: RoleEnum.SUPER,
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <BasicModal destroy-on-close @register="registerUserListModal" title="团队成员" width="1200px">
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
    <EditFormModal @register="registerModal" width="1200px" :onSubmit="handleSubmit" />
  </div>
</template>
<script lang="ts" setup>
  import EditFormModal from './EditFormModal.vue';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import * as adminApi from '@/api/admin/index';
  import { columns, searchFormSchema } from './pageConfig.data';
  import { computed, ref, unref } from 'vue';
  import { BasicModal, useModal } from '@/components/Modal';
  import { Card, Tabs } from 'ant-design-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { RoleEnum } from '@/enums/roleEnum';

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

  const totalData = ref({
    totalCount: 0,
    investmentAmount: 0,
    charityAmount: 0,
    earningsAmount: 0,
  });
  const [registerTable, { reload }] = useTable({
    title: '用户列表',
    canResize: false,
    isTreeTable: true,
    accordion: false, // 手风琴效果
    pagination: {
      pageSize: props.inviterId ? 10000 : 10,
    },
    api({ toTime, ...params }) {
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
              // 递归计算总数
              function deepCount(_data) {
                _data.forEach((item) => {
                  totalData.value.totalCount += 1;
                  totalData.value.investmentAmount += parseFloat(item.investmentAmount);
                  totalData.value.charityAmount += parseFloat(item.charityAmount);
                  totalData.value.earningsAmount += parseFloat(item.earningsAmount);
                  if (item.children) {
                    deepCount(item.children);
                  }
                });
              }
              deepCount(tempData);

              return tempData;
            });
        } else {
          return adminApi
            .getFansByLevel({
              level: props.level || 1,
              ...params,
            })
            .then((res) => {
              console.log(res);
              res.data.forEach((item) => {
                totalData.value.totalCount += 1;
                totalData.value.investmentAmount += parseFloat(item.investmentAmount);
                totalData.value.charityAmount += parseFloat(item.charityAmount);
                totalData.value.earningsAmount += parseFloat(item.earningsAmount);
              });
              return res;
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

  const [registerModal, { openModal }] = useModal();

  function handleCreate() {
    openModal(true, {
      editType: 0,
    });
  }

  function handleForfeitedBalance(record: Recordable) {
    openModal(true, {
      record,
      editType: 2,
    });
  }

  const { createMessage } = useMessage();
  const { success } = createMessage;

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      editType: 1,
    });
  }
  async function handleSubmit({ editType, values }) {
    if (editType === 0) {
      await adminApi.userCreate(values);
      success('创建成功');
    } else if (editType === 1) {
      await adminApi.userUpdate(values);
      success('更新成功');
    } else if (editType === 2) {
      const { _charityAmount, availableWithdrawalAmount, ...data } = values;
      await adminApi.userForfeitedBalance(data);
      success('没收成功');
    }
    reload();
    return true;
  }
  async function handleDelete(record: Recordable) {
    await adminApi.userDelete(record);
    success('删除成功');
    reload();
  }

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
