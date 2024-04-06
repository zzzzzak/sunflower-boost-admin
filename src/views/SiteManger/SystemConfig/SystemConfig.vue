<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增站点信息</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑',
                onClick: handleEdit.bind(null, record, 1),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此数据',
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
    <EditFormModal @register="registerModal" :onSubmit="handleSubmit" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, TableAction, useTable } from '@/components/Table';

  import * as systemConfig from '@/api/sys/systemConfig';

  import { useModal } from '@/components/Modal';

  import { columns, searchFormSchema } from './pageConfig.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import EditFormModal from './EditFormModal.vue';

  const [registerTable, { reload }] = useTable({
    title: '站点信息列表',
    api: systemConfig.getList,
    showTableSetting: true,
    useSearchForm: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    formConfig: {
      schemas: searchFormSchema,
    },
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

  async function handleDelete(record: Recordable) {
    await systemConfig.deleteData(record);
    createSuccessModal({ title: '提示', content: '删除成功' });
    reload();
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
      await systemConfig.updateData(values);
      createSuccessModal({ title: '提示', content: '更新成功' });
    } else {
      await systemConfig.addData(values);
      createSuccessModal({ title: '提示', content: '创建成功' });
    }
    reload();
    return true;
  }
</script>
