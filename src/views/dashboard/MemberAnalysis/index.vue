<template>
  <div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';

  import * as userApi from '@/api/sys/user';

  import { columns } from './pageConfig.data';

  const [registerTable] = useTable({
    title: '用户财务统计',
    api: userApi.getMemberAnalysis,
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    columns,
  });
</script>
