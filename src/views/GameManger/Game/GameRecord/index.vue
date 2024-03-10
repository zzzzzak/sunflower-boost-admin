<template>
  <div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';

  import * as gameApi from '@/api/sys/game';
  import { columns, searchFormSchema } from './pageConfig.data';

  const [registerTable] = useTable({
    title: '游戏记录列表',
    api: gameApi.getGameRecord,
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    formConfig: {
      schemas: searchFormSchema,
    },
    columns,
  });
</script>
