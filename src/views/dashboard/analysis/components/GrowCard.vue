<template>
  <div>
    <BasicForm submitOnReset @register="registerForm" @submit="handleSearchInfoChange" />
    <div class="md:flex flex-wrap">
      <template v-for="item in growCardList" :key="item.title">
        <Card size="small" :loading="loading" :title="item.title" class="md:w-1/6 w-full m-2">
          <template #extra>
            <Tag :color="item.color">{{ item.action }}</Tag>
          </template>

          <div class="py-4 px-4 flex justify-between items-center">
            <CountTo :startVal="1" :endVal="Number(item.value)" class="text-2xl" />
            <!-- <Icon :icon="item.icon" :size="40" /> -->
          </div>
        </Card>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '@/components/CountTo';
  import { Tag, Card } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  import { getAdminAnalysis } from '@/api/sys/user';
  import { GrowCardItem } from '../data';
  import { BasicForm, useForm } from '@/components/Form';

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
        title: '注册用户',
        icon: 'visit-count|svg',
        value: res.user_count,
        total: 120000,
        color: 'green',
        action: '位',
      },
      {
        title: '今日充值',
        icon: 'total-sales|svg',
        value: res.rechange_today_money,
        total: res.rechange_today_money,
        color: 'blue',
        action: '$',
      },
      {
        title: '今日提现',
        icon: 'download-count|svg',
        value: res.withdrawal_today_money,
        total: res.withdrawal_today_money,
        color: 'orange',
        action: '$',
      },
      {
        title: '总充值',
        icon: 'total-sales|svg',
        value: res.rechange_total_money,
        total: res.rechange_total_money,
        color: 'blue',
        action: '$',
      },
      {
        title: '总提现',
        icon: 'download-count|svg',
        value: res.withdrawal_total_money,
        total: res.withdrawal_total_money,
        color: 'orange',
        action: '$',
      },

      {
        title: '总投注',
        icon: 'download-count|svg',
        value: res.bet_total_money,
        total: res.bet_total_money,
        color: 'orange',
        action: '$',
      },

      {
        title: '总返水',
        icon: 'download-count|svg',
        value: res.fanshui_total_money,
        total: res.fanshui_total_money,
        color: 'orange',
        action: '$',
      },

      {
        title: '总返佣',
        icon: 'download-count|svg',
        value: res.commission_total_money,
        total: res.commission_total_money,
        color: 'orange',
        action: '$',
      },

      {
        title: '总彩金',
        icon: 'download-count|svg',
        value: res.jackpot_total_money,
        total: res.jackpot_total_money,
        color: 'orange',
        action: '$',
      },

      {
        title: '总游戏余额(非实时) ',
        icon: 'download-count|svg',
        value: res.game_total_money,
        total: res.game_total_money,
        color: 'orange',
        action: '$',
      },
      {
        title: '总用户现余额',
        icon: 'download-count|svg',
        value: res.member_total_balance,
        total: res.member_total_balance,
        color: 'orange',
        action: '$',
      },
      {
        title: '平台总输赢 ',
        icon: 'download-count|svg',
        value: res.winlose_total_money,
        total: res.winlose_total_money,
        color: 'orange',
        action: '$',
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
