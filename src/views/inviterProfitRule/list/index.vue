<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :dropDownActions="[
              {
                icon: 'clarity:note-edit-line',
                label: '编辑用户资料',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                label: '删除此数据',
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
    <EditFormModal @register="registerModal" width="1200px" :onSubmit="handleSubmit" />
    <BasicModal @register="registerUserListModal" title="刷新游戏余额" width="1200px">
      <BasicTable @register="registerUserListTable" />
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import * as adminApi from '@/api/admin/index.ts';
  import { columns, searchFormSchema } from './pageConfig.data';
  import { columns as userListColumns } from '../../member/list/pageConfig.data';
  import EditFormModal from './EditFormModal.vue';
  import { BasicModal, useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  const [registerTable, { reload }] = useTable({
    title: '用户列表',
    api: ({ toTime, ...params }) => {
      if (Array.isArray(toTime) && toTime.length) {
        params.toTime = toTime[0];
        params.formTime = toTime[1];
      }
      return adminApi.inviterProfitRuleListPage(params);
    },

    useSearchForm: true,
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    formConfig: {
      schemas: searchFormSchema,
    },
    actionColumn: {
      width: 80,
      title: '操作',
      fixed: 'right',
      dataIndex: 'action',
    },
    columns,
  });

  const [registerModal, { openModal }] = useModal();

  function handleCreate() {
    openModal(true, {
      editType: 0,
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
    if (editType) {
      await adminApi.inviterProfitRuleUpdate(values);
      success('更新成功');
    } else {
      await adminApi.inviterProfitRuleCreate(values);
      success('创建成功');
    }
    reload();
    return true;
  }
  async function handleDelete(record: Recordable) {
    await adminApi.inviterProfitRuleDelete(record);
    success('删除成功');
    reload();
  }

  let currentInviterProfitRuleId = null;
  function openUserListWindow(data) {
    openUserListModal();
    setTimeout(() => {
      currentInviterProfitRuleId = data?.id;
      reloadUserList();
    }, 100);
  }
  const [registerUserListModal, { openModal: openUserListModal }] = useModal();
  const [registerUserListTable, { reload: reloadUserList }] = useTable({
    title: '游戏列表',
    api: (params) =>
      adminApi.getUserList({
        inviterProfitRuleId: currentInviterProfitRuleId,
        ...params,
      }),
    immediate: false,
    rowKey: 'id',
    columns: userListColumns,
  });
</script>
