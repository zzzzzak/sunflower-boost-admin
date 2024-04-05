<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:users-solid',
                label: '下级代理数据',
                onClick: openRefreshWindow.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <BasicModal @register="registerRefreshModal" width="1400px">
      <BasicTable @register="registerSubTable" />
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import * as userApi from '@/api/sys/user';
  import { columns, searchFormSchema } from './pageConfig.data';
  import { BasicModal, useModal } from '@/components/Modal';

  const [registerTable] = useTable({
    title: '代理数据统计',
    api: ({ toTime, ...params }) => {
      if (Array.isArray(toTime) && toTime.length) {
        params.toTime = toTime[0];
        params.formTime = toTime[1];
      }
      return userApi.getAgentAnalysis(params);
    },
   
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

  let currentMemberId = null;
  function openRefreshWindow(data) {
    openRefreshModal();
    setTimeout(() => {
      currentMemberId = data?.member_tgid;
      reloadSub();
    }, 100);
  }
  const [registerRefreshModal, { openModal: openRefreshModal }] = useModal({});
  const [registerSubTable, { reload: reloadSub }] = useTable({
    title: '游戏列表',
    api: ({ toTime, ...params }) => {
      if (Array.isArray(toTime) && toTime.length) {
        params.toTime = toTime[0];
        params.formTime = toTime[1];
      }
      return userApi.getAgentMemberAnalysis({
        member_tgid: currentMemberId,
        ...params,
      });
    },
    immediate: false,
    rowKey: 'id',
   
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    formConfig: {
      schemas: searchFormSchema.filter((item) => item.field !== 'member_tgid'),
    },
    columns: [
      { title: '用户唯一ID', dataIndex: 'member_id' },
      { title: 'TGid', dataIndex: 'member_tgid' },
      { title: '用户现余额', dataIndex: 'member_balance' },
      { title: '总充值', dataIndex: 'total_rechange' },
      { title: '总提现', dataIndex: 'total_withdrawal' },
      { title: '总投注', dataIndex: 'total_bet' },
      { title: '总输赢', dataIndex: 'total_winlose' },
      { title: '总返水', dataIndex: 'total_rebate' },
      { title: '总未返水', dataIndex: 'total_wait_rebate' },
      { title: '总返佣', dataIndex: 'total_commission' },
      { title: '总派彩', dataIndex: 'total_jackpot' },
      { title: '总游戏余额（非实时）', dataIndex: 'api_money' },
      { title: '游戏局数', dataIndex: 'game_number' },
    ],
  });
</script>
