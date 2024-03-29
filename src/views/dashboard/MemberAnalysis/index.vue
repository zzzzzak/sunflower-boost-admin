<template>
  <div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import * as userApi from '@/api/sys/user';
  import { columns, searchFormSchema } from './pageConfig.data';

  const [registerTable] = useTable({
    title: '用户财务统计',
    api: ({ toTime, ...params }) => {
      if (Array.isArray(toTime) && toTime.length) {
        params.toTime = toTime[0];
        params.formTime = toTime[1];
      }
      return userApi.getMemberAnalysis(params);
    },
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    columns,
    formConfig: {
      schemas: searchFormSchema,
    },
  });
</script>
