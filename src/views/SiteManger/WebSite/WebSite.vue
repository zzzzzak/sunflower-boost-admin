<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑',
                onClick: handleEdit.bind(null, record, 1),
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

  import * as websiteApi from '@/api/sys/website';

  import { useModal } from '@/components/Modal';

  import { columns, formSchema } from './pageConfig.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import EditFormModal from './EditFormModal.vue';

  const [registerTable, { reload }] = useTable({
    title: '站点信息列表',
    api: websiteApi.getList,

    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    // rowSelection: {
    //   type: 'checkbox',
    // },
    // showSelectionBar: true, // 显示多选状态栏
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
      isUpdate: 0,
    });
  }

  function handleEdit(record: Recordable, isUpdate: 0 | 1) {
    openModal(true, {
      record,
      isUpdate,
    });
  }

  const { createSuccessModal } = useMessage();

  async function handleSubmit({ isUpdate, values }) {
    if (isUpdate) {
      await websiteApi.updateData(values);
      createSuccessModal({ title: '提示', content: '审核成功' });
    }
    reload();
    return true;
  }
</script>
