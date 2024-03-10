<template>
  <div class="md:flex flex-wrap">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card size="small" :loading="loading" :title="item.title" class="md:w-1/6 w-full m-2">
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between items-center">
          <CountTo :startVal="1" :endVal="item.value" class="text-2xl" />
          <!-- <Icon :icon="item.icon" :size="40" /> -->
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '@/components/CountTo';
  import Icon from '@/components/Icon/Icon.vue';
  import { Tag, Card } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  import { getAdminAnalysis } from '@/api/sys/user';
  import { GrowCardItem } from '../data';

  defineProps({
    loading: {
      type: Boolean,
    },
  });

  const growCardList = ref<GrowCardItem[]>([]);
  onMounted(async () => {
    const res = await getAdminAnalysis();
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
        total: res.rechange_total_money,
        color: 'blue',
        action: '$',
      },
      {
        title: '今日提现',
        icon: 'download-count|svg',
        value: res.withdrawal_today_money,
        total: res.withdrawal_total_money,
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
        value: res.withdrawal_total_money,
        total: res.withdrawal_total_money,
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

      // {
      //   title: '成交数',
      //   icon: 'transaction|svg',
      //   value: 5000,
      //   total: 50000,
      //   color: 'purple',
      //   action: '年',
      // },
    ];
  });
</script>
