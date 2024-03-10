<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                ifShow: record.cash_status === 0,
                icon: 'clarity:check-circle-line',
                tooltip: '审核',
                label: '审核',
                onClick: handleEdit.bind(null, record, 0),
              },
              // {
              //   icon: 'clarity:note-edit-line',
              //   tooltip: '修改订单',
              //   onClick: handleEdit.bind(null, record, 1),
              // },
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

  import * as withdrawalApi from '@/api/sys/withdrawal';
  import EditFormModal from './EditFormModal.vue';
  import { useModal } from '@/components/Modal';

  import { columns, searchFormSchema } from './pageConfig.data';
  import { useMessage } from '@/hooks/web/useMessage';

  const [registerTable, { reload }] = useTable({
    title: '提现申请列表',
    api: ({ toTime, ...params }) => {
      if (Array.isArray(toTime) && toTime.length) {
        params.toTime = toTime[0];
        params.formTime = toTime[1];
      }
      return withdrawalApi.getList(params);
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
      await withdrawalApi.audioData(values);
      createSuccessModal({ title: '提示', content: '创建成功' });
    }
    reload();
    return true;
  }
</script>
