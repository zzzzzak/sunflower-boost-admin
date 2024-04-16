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
                icon: 'clarity:user-line',
                label: '当前等级会员',
                onClick: openUserListWindow.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                label: '编辑等级',
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
    <BasicModal destroy-on-close @register="registerUserListModal" title="用户列表" width="1200px">
      <MemberList :use-search-form="false" :search-params="{ levelId: currentLevelId }" />
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import * as adminApi from '@/api/admin/index';
  import { columns, searchFormSchema } from './pageConfig.data';
  import EditFormModal from './EditFormModal.vue';
  import { BasicModal, useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import MemberList from '@/components/BusinessComponents/MemberList/index.vue';
  import { ref } from 'vue';

  const [registerTable, { reload }] = useTable({
    title: '用户列表',
    api: ({ toTime, ...params }) => {
      if (Array.isArray(toTime) && toTime.length) {
        params.toTime = toTime[0];
        params.formTime = toTime[1];
      }
      return adminApi.levelListPage(params);
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
      await adminApi.levelUpdate(values);
      success('更新成功');
    } else {
      await adminApi.levelCreate(values);
      success('创建成功');
    }
    reload();
    return true;
  }
  async function handleDelete(record: Recordable) {
    await adminApi.levelDelete(record);
    success('删除成功');
    reload();
  }

  const currentLevelId = ref(null);
  function openUserListWindow(data) {
    openUserListModal();
    currentLevelId.value = data?.id;
  }
  const [registerUserListModal, { openModal: openUserListModal }] = useModal();
</script>
