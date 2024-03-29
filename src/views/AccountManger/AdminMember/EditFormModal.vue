<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #googleQrcode="{ model, field, disabled }">
        <FormItem
          class="flex items-center"
          :name="field"
          label="自定义colSlot"
          :rules="[{ required: true }]"
        >
          <a-input-group compact>
            <a-input
              style="width: calc(100% - 100px)"
              v-model:value="model[field]"
              :disabled="disabled"
              placeholder="请扫描谷歌二维码后，填写验证码"
            />
            <a-button type="primary" v-click-loading="handleGoogleQrCode">生成</a-button>
          </a-input-group>
        </FormItem>
        <FormItem
          class="flex items-center"
          :name="field"
          label="自定义colSlot"
          :rules="[{ required: true }]"
        >
          <QrCode
            class="mt-4"
            :value="`otpauth://totp/?secret=${model[field]}`"
            :options="{ margin: 0 }"
          />
        </FormItem>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { accountFormSchema } from './pageConfig.data';
  import { createGoogleKey } from '@/api/sys/adminMember';
  import { QrCode } from '@/components/Qrcode';

  defineOptions({ name: 'AccountModal' });
  const props = defineProps({
    onSubmit: {
      type: Function,
      default: () => ({}),
    },
  });

  defineEmits(['submit', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { resetSchema, setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: accountFormSchema,
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
      rowId.value = data.record.member_id;
      setFieldsValue({
        ...data.record,
      });
      resetSchema(accountFormSchema);
    } else {
      resetSchema(
        accountFormSchema.map((item) => {
          if (item.field === 'member_password') {
            return {
              ...item,
              required: true,
            };
          }
          return item;
        }),
      );
      const res = await createGoogleKey();
      setFieldsValue({
        ...data.record,
        member_authkey: res.key,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      console.log(values);
      const res = await props.onSubmit({
        isUpdate: unref(isUpdate),
        values: { ...values, member_id: rowId.value },
      });
      if (res) {
        closeModal();
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  async function handleGoogleQrCode() {
    const res = await createGoogleKey();
    setFieldsValue({ member_authkey: res.key });
  }
</script>
