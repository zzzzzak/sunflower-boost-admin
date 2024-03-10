<template>
  <BasicTable @register="registerTable">
    <template #form-custom> custom-slot </template>
    <template #toolbar>
      <a-button type="primary" @click="handleCreate">新增账号</a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="[
            {
              icon: 'clarity:analytics-line',
              tooltip: '查看代理统计',
              onClick: handleAgentAnalysis.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑代理资料',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此账号',
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
  <AgentModal @register="registerModal" :onSubmit="handleSubmit" />
  <AgentAnalysis @register="registerAgentAnalysisModal" />
</template>
<script lang="ts" setup>
  import { BasicTable, TableAction, useTable } from '@/components/Table';

  import * as agentApi from '@/api/sys/agent';
  import AgentModal from './AgentModal.vue';
  import AgentAnalysis from './AgentAnalysis.vue';
  import { useModal } from '@/components/Modal';

  import { columns, searchFormSchema } from './agent.data';
  import { useMessage } from '@/hooks/web/useMessage';

  const [registerTable, { reload }] = useTable({
    title: '代理列表',
    api: ({ toTime, ...params }) => {
      if (Array.isArray(toTime) && toTime.length) {
        params.toTime = toTime[0];
        params.formTime = toTime[1];
      }
      return agentApi.getList(params);
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

  function handleEdit({ member_password: _, ...record }: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleDelete(record: Recordable) {
    await agentApi.deleteData(record);
    success('删除成功');
    reload();
  }

  const { createMessage } = useMessage();
  const { success } = createMessage;

  async function handleSubmit({ isUpdate, values }) {
    console.log(isUpdate);
    if (isUpdate) {
      await agentApi.updateData(values);
      success('更新成功');
    } else {
      await agentApi.addData(values);
      success('创建成功');
    }
    reload();
    return true;
  }

  const [registerAgentAnalysisModal, { openModal: openAgentAnalysisModal }] = useModal();
  function handleAgentAnalysis(record: Recordable) {
    openAgentAnalysisModal(true, { record });
  }
</script>
