<template>
  <div>
    <BasicTable @register="registerTable">
      <template #form-custom> custom-slot </template>
      <template #toolbar>
        <a-button type="primary" @click="handleExport">导出</a-button>
        <a-button type="primary" @click="handleCreate">新增</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'api_money'">
          {{ record?.api_money }}
          <a-button size="small" type="link" @click="() => openRefreshWindow(record)">
            刷新
          </a-button>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :dropDownActions="[
              {
                icon: 'clarity:refresh-line',
                label: '一键回收',
                onClick: handleRecycleApiBalance.bind(null, record),
              },
              {
                icon: 'clarity:dollar-bill-solid',
                label: '彩金操作',
                onClick: handleExchangeBalance.bind(null, record),
              },
              {
                icon: 'clarity:data-cluster-solid',
                label: '彩金上下分',
                onClick: handleChangeJackpot.bind(null, record),
              },
              {
                icon: 'clarity:dollar-solid',
                label: '上下分',
                onClick: handleChangeBalance.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                label: '编辑用户资料',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                label: '删除此账号',
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
    <MemberModal @register="registerModal" :onSubmit="handleSubmit" />
    <ChangeBalanceModal
      @register="registerChangeBalanceModal"
      :onSubmit="handleChangeBalanceSubmit"
    />
    <ChangeJackpotModal
      @register="registerChangeJackpotModal"
      :onSubmit="handleChangeJackpotSubmit"
    />
    <ExchangeBalanceModal
      @register="registerExchangeBalanceModal"
      :onSubmit="handleExchangeBalanceSubmit"
    />
    <BasicModal @register="registerRefreshModal" title="刷新游戏余额">
      <BasicTable @register="registerGameListTable">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction
              :actions="[
                {
                  icon: 'clarity:refresh-line',
                  tooltip: '刷新余额',
                  onClick: handleRefreshGameMoney.bind(null, record),
                },
              ]"
            />
          </template>
        </template>
      </BasicTable>
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import qs from 'qs';

  import * as memberApi from '@/api/sys/member';
  import MemberModal from './MemberModal.vue';
  import ChangeBalanceModal from './ChangeBalanceModal.vue';
  import ChangeJackpotModal from './ChangeJackpotModal.vue';
  import ExchangeBalanceModal from './ExchangeBalanceModal.vue';
  import { BasicModal, useModal } from '@/components/Modal';

  import { columns, searchFormSchema } from './member.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { getAppEnvConfig } from '@/utils/env';

  const [registerTable, { reload, getForm }] = useTable({
    title: '会员列表',
    api: ({ toTime, ...params }) => {
      if (Array.isArray(toTime) && toTime.length) {
        params.toTime = toTime[0];
        params.formTime = toTime[1];
      }
      return memberApi.getList(params);
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
      width: 60,
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

  async function handleDelete(record: Recordable) {
    await memberApi.deleteData(record);
    success('删除成功');
    reload();
  }

  const { createMessage } = useMessage();
  const { success } = createMessage;
  async function handleSubmit({ isUpdate, values }) {
    console.log(isUpdate);
    if (isUpdate) {
      await memberApi.updateData(values);
      success('更新成功');
    } else {
      await memberApi.addData(values);
      success('创建成功');
    }
    reload();
    return true;
  }

  const [registerChangeBalanceModal, { openModal: openChangeBalanceModal }] = useModal();

  function handleChangeBalance(record: Recordable) {
    openChangeBalanceModal(true, {
      record,
    });
  }
  async function handleChangeBalanceSubmit({ values }) {
    await memberApi.changeBalance(values);
    success('上下分成功');
    reload();
    return true;
  }

  const [registerChangeJackpotModal, { openModal: openChangeJackpotModal }] = useModal();

  function handleChangeJackpot(record: Recordable) {
    openChangeJackpotModal(true, {
      record,
    });
  }
  async function handleChangeJackpotSubmit({ values }) {
    await memberApi.changeJackpot(values);
    success('彩金操作成功');
    reload();
    return true;
  }
  const [registerExchangeBalanceModal, { openModal: openExchangeBalanceModal }] = useModal();

  async function handleRecycleApiBalance(record: Recordable) {
    await memberApi.recycleApiBalance({ member_id: record.member_id });
    success('回收成功');
    reload();
  }
  function handleExchangeBalance(record: Recordable) {
    openExchangeBalanceModal(true, {
      record,
    });
  }
  function handleExport() {
    const { toTime, ...params } = getForm().getFieldsValue();
    if (Array.isArray(toTime) && toTime.length) {
      params.toTime = toTime[0];
      params.formTime = toTime[1];
    }
    const paramsStr = qs.stringify(params);
    location.href = `${getAppEnvConfig().VITE_GLOB_API_URL}/admin/v1/ExportMemberReport${paramsStr ? `?${paramsStr}` : ''}`;
  }
  async function handleExchangeBalanceSubmit({ values }) {
    await memberApi.exchangeBalance(values);
    success('彩金操作成功');
    reload();
    return true;
  }
  let currentMemberId = null;
  function openRefreshWindow(data) {
    openRefreshModal();
    setTimeout(() => {
      currentMemberId = data?.member_id;
      reloadGameList();
    }, 100);
  }
  function handleRefreshGameMoney(record) {
    memberApi.getApiBalance({ member_id: currentMemberId, plat_name: record.api_code }).then(() => {
      reloadGameList();
      reload();
    });
  }
  const [registerRefreshModal, { openModal: openRefreshModal }] = useModal();
  const [registerGameListTable, { reload: reloadGameList }] = useTable({
    title: '游戏列表',
    api: (params) =>
      memberApi.getUserApi({
        member_id: currentMemberId,
        ...params,
      }),
    immediate: false,
    rowKey: 'id',
    columns: [
      {
        title: '游戏名称',
        dataIndex: 'api_code',
      },
      {
        title: '余额',
        dataIndex: 'api_money',
      },
    ],

    actionColumn: {
      width: 90,
      title: '操作',
      dataIndex: 'action',
    },
  });
</script>
