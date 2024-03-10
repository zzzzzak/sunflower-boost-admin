<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="代理统计"
    @ok="handleSubmit"
    width="700px"
  >
    <div class="stats stats-vertical lg:stats-horizontal shadow m-2">
      <div class="stat">
        <div class="stat-figure text-secondary">
          <Icon icon="ant-design:account-book-filled" size="60" color="#efefef" />
        </div>
        <div class="stat-title">今日充值</div>
        <div class="stat-value">{{ analysis.rechange_today_money }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <Icon icon="ant-design:account-book-filled" size="60" color="#efefef" />
        </div>
        <div class="stat-title"> 今日提现 </div>
        <div class="stat-value">{{ analysis.withdrawal_today_money }}</div>
      </div>
      <div class="stat">
        <div class="stat-figure text-secondary">
          <Icon icon="ant-design:usergroup-add-outlined" size="60" color="#efefef" />
        </div>
        <div class="stat-title">总下线用户</div>
        <div class="stat-value">{{ analysis.user_count }}</div>
      </div>
    </div>
    <div class="stats stats-vertical lg:stats-horizontal shadow m-2">
      <div class="stat">
        <div class="stat-figure text-secondary">
          <Icon icon="ant-design:money-collect-twotone" size="60" color="#efefef" />
        </div>
        <div class="stat-title"> 总充值 </div>
        <div class="stat-value">{{ analysis.rechange_total_money }}</div>
      </div>
      <div class="stat">
        <div class="stat-figure text-secondary">
          <Icon icon="ant-design:money-collect-twotone" size="60" color="#efefef" />
        </div>
        <div class="stat-title"> 总提现 </div>
        <div class="stat-value">{{ analysis.withdrawal_total_money }}</div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import Icon from '@/components/Icon/Icon.vue';
  import { getAgentAnalysis } from '@/api/sys/agent';

  defineOptions({ name: 'AgentAnalysisModal' });
  const emit = defineEmits(['register']);

  const rowId = ref('');
  const analysis = ref({} as any);

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    rowId.value = data.record.member_id;
    analysis.value = await getAgentAnalysis({ agent_id: rowId.value });
  });

  async function handleSubmit() {
    closeModal();
  }
</script>
