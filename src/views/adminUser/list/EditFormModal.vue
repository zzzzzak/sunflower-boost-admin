<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #googleQrcode="{ model, field, disabled }">
        <a-input-group compact>
          <a-input
            style="width: calc(100% - 100px)"
            v-model:value="model[field]"
            :disabled="disabled"
            placeholder="请扫描谷歌二维码后，填写验证码"
          />
          <a-button type="primary" v-click-loading="handleGoogleQrCode">生成</a-button>
        </a-input-group>

        <QrCode
          v-if="model[field]"
          class="mt-4"
          :value="`otpauth://totp/admin?secret=${model[field]}&issuer=sunflower-boost`"
          :options="{ margin: 0 }"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './pageConfig.data';
  import { QrCode } from '@/components/Qrcode';
  import { googleQrcode } from '@/api/admin/index';

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

    setFieldsValue({
      ...data.record,
    });
    if (unref(editType) === 0) {
      resetSchema(formSchema);
    } else if (unref(editType) === 1) {
      rowId.value = data.record.id;
      // resetSchema(audioSchema);
    }
  });

  const getTitle = computed(() => (!unref(editType) ? '新增' : '编辑'));

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
      if (unref(editType) === 1) {
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
  async function handleGoogleQrCode() {
    const res = await googleQrcode({
      accountName: 'admin',
    });
    setFieldsValue({ otpSecret: res.secret });
  }
</script>
