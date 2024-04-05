<template>
  <BasicTable @register="registerTable" />
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import * as memberApi from '@/api/sys/member.ts';
  import { columns, searchFormSchema } from './pageConfig.data';

  const [registerTable] = useTable({
    title: '用户列表',
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
  });
</script>
