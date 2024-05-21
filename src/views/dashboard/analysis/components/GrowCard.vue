<template>
  <div>
    <!-- <BasicForm submitOnReset @register="registerForm" @submit="handleSearchInfoChange" /> -->
    <div class="md:flex flex-wrap">
      <template v-for="item in growCardList" :key="item.title">
        <Card size="small" :loading="loading" :title="item.title" class="md:w-1/3 w-full">
          <template #extra>
            <Tag :color="item.color">{{ item.action }}</Tag>
          </template>

          <div class="py-4 px-4 flex justify-between items-center">
            <!-- <CountTo :startVal="1" :endVal="Number(item.value)" class="text-2xl" /> -->
            <div class="text-2xl">{{ item.value || 0 }}</div>
            <!-- <Icon :icon="item.icon" :size="40" /> -->
          </div>
        </Card>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Tag, Card } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  import { getAdminAnalysis } from '@/api/admin/index';
  import { GrowCardItem } from '../data';
  import { useForm } from '@/components/Form';

  defineProps({
    loading: {
      type: Boolean,
    },
  });

  const [registerForm] = useForm({
    schemas: [
      {
        label: '时间',
        field: 'toTime',
        component: 'RangePicker',
        componentProps: {
          valueFormat: 'YYYY-MM-DD',
        },
      },
    ],
  });

  const growCardList = ref<GrowCardItem[]>([]);
  onMounted(async () => {
    loadData();
  });

  async function loadData(params = {}) {
    const res = await getAdminAnalysis(params);
    growCardList.value = [
      {
        title: '今日注册用户',
        icon: 'visit-count|svg',
        value: res.todayUserCount,
        color: 'green',
        action: '位',
      },

      {
        title: '今日充值订单数',
        icon: 'total-sales|svg',
        value: res.todayOrderCount,
        color: 'blue',
        action: '笔',
      },
      {
        title: '今日充值金额',
        icon: 'total-sales|svg',
        value: Number(res.todayOrderTotalMoney || 0).toFixed(2),
        color: 'blue',
        action: 'DOGE',
      },
      {
        title: '今日提现订单数',
        icon: 'total-sales|svg',
        value: res.todayWithdrawalCount,
        color: 'blue',
        action: '笔',
      },
      {
        title: '今日提现金额',
        icon: 'total-sales|svg',
        value: Number(res.todayWithdrawalTotalMoney || 0).toFixed(2),
        color: 'blue',
        action: 'DOGE',
      },
      {
        title: '今日实际提现金额',
        icon: 'total-sales|svg',
        value: Number(res.todayWithdrawalTotalRealMoney || 0).toFixed(2),
        color: 'blue',
        action: 'DOGE',
      },
      {
        title: '注册用户',
        icon: 'visit-count|svg',
        value: res.userCount,
        color: 'green',
        action: '位',
      },
      {
        title: '总充值',
        icon: 'total-sales|svg',
        value: Number(res.rechangeTotalMoney || 0).toFixed(2),
        color: 'blue',
        action: 'DOGE',
      },
      {
        title: '总提现',
        icon: 'download-count|svg',
        value: Number(res.withdrawalTotalMoney || 0).toFixed(2),
        color: 'orange',
        action: 'DOGE',
      },
      {
        title: '总实际提现',
        icon: 'download-count|svg',
        value: Number(res.realAmount || 0).toFixed(2),
        color: 'orange',
        action: 'DOGE',
      },
      {
        title: '总慈善',
        icon: 'download-count|svg',
        value: Number(res.charityAmount || 0).toFixed(2),
        color: 'orange',
        action: 'DOGE',
      },
      {
        title: '总分润',
        icon: 'download-count|svg',
        value: Number(res.commissionTotalMoney || 0).toFixed(2),
        color: 'orange',
        action: 'DOGE',
      },
      {
        title: '总冻结',
        icon: 'download-count|svg',
        value: Number(res.frozenAmount || 0).toFixed(2),
        color: 'orange',
        action: 'DOGE',
      },
    ];
  }

  async function handleSearchInfoChange({ toTime, ...params }) {
    if (Array.isArray(toTime) && toTime.length) {
      params.toTime = toTime[0];
      params.formTime = toTime[1];
    }
    return loadData(params);
  }
</script>
