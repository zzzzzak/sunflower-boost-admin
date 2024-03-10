<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="彩金上下分"
    @ok="handleSubmit"
    :minHeight="100"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { changeJackpotFormSchema } from './member.data';

  defineOptions({ name: 'AccountModal' });
  const props = defineProps({
    onSubmit: {
      type: Function,
      default: () => ({}),
    },
  });

  defineEmits(['submit', 'register']);

  const rowId = ref('');

  const [registerForm, { resetSchema, setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: changeJackpotFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    rowId.value = data.record.member_id;
    setFieldsValue({
      ...data.record,
    });
    resetSchema(changeJackpotFormSchema);
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      console.log(values);
      const res = await props.onSubmit({
        values: { ...values, member_id: rowId.value },
      });
      if (res) {
        closeModal();
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
