<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './pageConfig.data';

  defineOptions({ name: 'AccountModal' });
  const props = defineProps({
    onSubmit: {
      type: Function,
      default: () => ({}),
    },
  });

  const emit = defineEmits(['submit', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, resetFields, validate, resetSchema }] = useForm({
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
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      resetSchema(formSchema);
      rowId.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    } else {
      resetSchema(formSchema);
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      console.log(values);
      const res = await props.onSubmit({
        isUpdate: unref(isUpdate),
        values: { ...values, id: rowId.value },
      });
      if (res) {
        closeModal();
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
