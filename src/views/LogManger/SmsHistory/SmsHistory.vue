<template>
  <BasicTable @register="registerTable">
    <template #bodyCell="{ column, record }"> </template>
  </BasicTable>
</template>
<script lang="ts" setup>
  import { BasicTable, TableAction, useTable } from '@/components/Table';

  import { getSmsSendList } from '@/api/sys/log';
  import { useModal } from '@/components/Modal';

  import { columns, searchFormSchema } from './pageConfig.data';
  import { useMessage } from '@/hooks/web/useMessage';

  const [registerTable, { reload }] = useTable({
    title: '短信日志列表',
    api: getSmsSendList,
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    // rowSelection: {
    //   type: 'checkbox',
    // },
    // showSelectionBar: true, // 显示多选状态栏
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
      editType: 0,
    });
  }

  function handleEdit(record: Recordable, editType: 0 | 1) {
    openModal(true, {
      record,
      editType,
    });
  }

  const { createSuccessModal } = useMessage();

  async function handleSubmit({ editType, values }) {
    console.log(editType);
    if (editType) {
      await withdrawalApi.updateData(values);
      createSuccessModal({ title: '提示', content: '审核成功' });
    } else {
      await withdrawalApi.addData(values);
      createSuccessModal({ title: '提示', content: '创建成功' });
    }
    reload();
    return true;
  }
</script>
