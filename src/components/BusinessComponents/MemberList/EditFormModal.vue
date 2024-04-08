<template>
  <div>
    <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
      <BasicForm @register="registerForm" />
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema, forfeitedBalanceFormSchema } from './pageConfig.data';

  defineOptions({ name: 'AgentModal' });
  const props = defineProps({
    onSubmit: {
      type: Function,
      default: () => ({}),
    },
  });

  defineEmits(['submit', 'register']);

  // 0审核，1修改
  const editType = ref(0);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, resetFields, resetSchema, validate }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    editType.value = data?.editType;

    if (unref(editType) === 0) {
      resetSchema(formSchema);
    } else if (unref(editType) === 1) {
      setFieldsValue({
        ...data.record,
      });
      resetSchema(formSchema);
      rowId.value = data.record.id;
    } else if (unref(editType) === 2) {
      setTimeout(() => {
        setFieldsValue({
          amount: data.record.availableWithdrawalAmount,
        });
      });
      resetSchema(forfeitedBalanceFormSchema);
    }
  });

  const getTitle = computed(() => ['新增', '编辑', '没收'][unref(editType)]);

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      console.log(values);
      const params: any = {
        editType: unref(editType),
        values: { ...values },
      };
      if (unref(editType) === 0) {
      } else if (unref(editType) === 1) {
        params.values.id = rowId.value;
      } else if (unref(editType) === 2) {
        params.values.id = rowId.value;
      }

      const res = await props.onSubmit(params);
      if (res) {
        closeModal();
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
