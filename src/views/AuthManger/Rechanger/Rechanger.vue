<template>
  <div>
    <BasicTable @register="registerTable">
      <!-- <template #toolbar>
      <a-button type="primary" @click="handleCreate">余额充值</a-button>
    </template> -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '审核',
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

  import * as rechangeApi from '@/api/sys/rechange';
  import EditFormModal from './EditFormModal.vue';
  import { useModal } from '@/components/Modal';

  import { columns, searchFormSchema } from './pageConfig.data';
  import { useMessage } from '@/hooks/web/useMessage';

  const [registerTable, { reload }] = useTable({
    title: '充值订单列表',
    api: ({ toTime, ...params }) => {
      if (Array.isArray(toTime) && toTime.length) {
        params.toTime = toTime[0];
        params.formTime = toTime[1];
      }
      return rechangeApi.getList(params);
    },
    fetchSetting: {
      pageField: 'pageIndex',
      sizeField: 'pageSize',
      listField: 'list',
      totalField: 'total',
    },
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
      await rechangeApi.updateData(values);
      success('更新成功');
    } else {
      await rechangeApi.addData(values);
      success('创建成功');
    }
    reload();
    return true;
  }
</script>
