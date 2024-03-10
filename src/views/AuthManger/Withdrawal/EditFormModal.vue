<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema, audioSchema } from './pageConfig.data';

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
    labelWidth: 100,
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

    setFieldsValue({
      ...data.record,
    });
    if (unref(editType) === 0) {
      rowId.value = data.record.cash_order;
      resetSchema(formSchema);
    } else if (unref(editType) === 1) {
      rowId.value = data.record.id;
      resetSchema(audioSchema);
    }
  });

  const getTitle = computed(() => (!unref(editType) ? '新增账号' : '编辑账号'));

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
        params.values.cash_order = rowId.value;
      } else if (unref(editType) === 1) {
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
