<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增游戏</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑游戏',
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <EditFormModal @register="registerModal" :onSubmit="handleSubmit" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, TableAction, useTable } from '@/components/Table';

  import * as gameApi from '@/api/sys/game';
  import EditFormModal from './EditFormModal.vue';
  import { useModal } from '@/components/Modal';

  import { columns, searchFormSchema } from './pageConfig.data';
  import { useMessage } from '@/hooks/web/useMessage';

  const [registerTable, { reload }] = useTable({
    title: '游戏列表',
    api: gameApi.getList,
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    formConfig: {
      schemas: searchFormSchema,
    },
    columns,
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
    },
  });

  const [registerModal, { openModal }] = useModal();

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  const { createMessage } = useMessage();
  const { success } = createMessage;
  async function handleSubmit({ isUpdate, values }) {
    console.log(isUpdate);
    if (isUpdate) {
      await gameApi.updateData(values);
      success('更新成功');
    } else {
      await gameApi.addData(values);
      success('创建成功');
    }
    reload();
    return true;
  }
</script>
