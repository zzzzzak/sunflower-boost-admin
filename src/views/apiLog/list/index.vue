<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :dropDownActions="[
              {
                icon: 'clarity:note-edit-line',
                label: '编辑API日志',
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
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import * as adminApi from '@/api/admin/index';
  import { columns, searchFormSchema } from './pageConfig.data';
  import EditFormModal from './EditFormModal.vue';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  const [registerTable, { reload }] = useTable({
    title: 'API日志列表',
    api: ({ toTime, ...params }) => {
      if (Array.isArray(toTime) && toTime.length) {
        params.toTime = toTime[0];
        params.formTime = toTime[1];
      }
      return adminApi.apiLogListPage(params);
    },

    useSearchForm: true,
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    formConfig: {
      schemas: searchFormSchema,
    },
    // actionColumn: {
    //   width: 80,
    //   title: '操作',
    //   fixed: 'right',
    //   dataIndex: 'action',
    // },
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
      await adminApi.apiLogUpdate(values);
      success('更新成功');
    } else {
      await adminApi.apiLogCreate(values);
      success('创建成功');
    }
    reload();
    return true;
  }
  async function handleDelete(record: Recordable) {
    await adminApi.apiLogDelete(record);
    success('删除成功');
    reload();
  }
</script>
