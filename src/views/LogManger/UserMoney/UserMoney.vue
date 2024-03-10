<template>
  <BasicTable @register="registerTable" />
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import * as logApi from '@/api/sys/log';
  import { columns, searchFormSchema } from './pageConfig.data';

  const [registerTable] = useTable({
    title: '余额日志列车',
    api: ({ toTime, ...params }) => {
      if (Array.isArray(toTime) && toTime.length) {
        params.toTime = toTime[0];
        params.formTime = toTime[1];
      }
      return logApi.getUserMoneyLogList(params);
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
  });
</script>
./pageConfig.data
