<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!-- <a-button type="primary" @click="handleCreate">新增</a-button> -->
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :dropDownActions="[
              // {
              //   icon: 'clarity:user-line',
              //   label: '当前等级会员',
              //   onClick: openUserListWindow.bind(null, record),
              // },
              {
                icon: 'clarity:note-edit-line',
                label: '审批',
                onClick: handleEdit.bind(null, record),
                ifShow: () => record.audit === 'PENDING',
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
    <BasicModal @register="registerUserListModal" title="用户信息" width="1200px">
      <BasicTable @register="registerUserListTable" />
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import * as adminApi from '@/api/admin/index';
  import { columns, searchFormSchema } from './pageConfig.data';
  import { columns as userListColumns } from '../../member/list/pageConfig.data';
  import EditFormModal from './EditFormModal.vue';
  import { BasicModal, useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  const [registerTable, { reload }] = useTable({
    title: '提现明细列表',
    api: ({ toTime, ...params }) => {
      if (Array.isArray(toTime) && toTime.length) {
        params.toTime = toTime[0];
        params.formTime = toTime[1];
      }
      return adminApi.withdrawalListPage(params);
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
      await adminApi.withdrawalUpdate(values);
      success('更新成功');
    } else {
      await adminApi.withdrawalCreate(values);
      success('创建成功');
    }
    reload();
    return true;
  }
  async function handleDelete(record: Recordable) {
    await adminApi.withdrawalDelete(record);
    success('删除成功');
    reload();
  }

  let currentWithdrawalId = null;
  function openUserListWindow(data) {
    openUserListModal();
    setTimeout(() => {
      currentWithdrawalId = data?.id;
      reloadUserList();
    }, 100);
  }
  const [registerUserListModal, { openModal: openUserListModal }] = useModal();
  const [registerUserListTable, { reload: reloadUserList }] = useTable({
    title: '提现明细列表',
    api: (params) =>
      adminApi.getUserList({
        withdrawalId: currentWithdrawalId,
        ...params,
      }),
    immediate: false,
    rowKey: 'id',
    columns: userListColumns,
  });
</script>
