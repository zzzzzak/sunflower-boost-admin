<template>
  <div :class="[prefixCls, { fullscreen }]">
    <Upload
      name="file"
      multiple
      :headers="{
        Authorization: `Bearer ${getToken()}`,
      }"
      :customRequest="onCustomRequest"
      @change="handleChange"
      action="/"
      :showUploadList="false"
      accept=".jpg,.jpeg,.gif,.png,.webp"
    >
      <a-button type="primary" v-bind="{ ...getButtonProps }">
        {{ t('component.upload.imgUpload') }}
      </a-button>
    </Upload>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';

  import { Upload } from 'ant-design-vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useI18n } from '@/hooks/web/useI18n';
  import { getToken } from '@/utils/auth';
  import { GetUploadPath } from '@/api/admin';
  import axios from 'axios';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'TinymceImageUpload' });

  const props = defineProps({
    fullscreen: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['uploading', 'done', 'error']);

  let uploading = false;

  const { t } = useI18n();
  const { prefixCls } = useDesign('tinymce-img-upload');

  const getButtonProps = computed(() => {
    const { disabled } = props;
    return {
      disabled,
    };
  });

  const { createMessage } = useMessage();
  async function onCustomRequest({ file, onSuccess, onError }): any {
    try {
      const { uploadURL } = await GetUploadPath({
        filename: file.name,
      });
      const formData = new FormData();
      formData.append('file', file);
      const {
        data: {
          result: {
            variants: [imageUrl],
          },
        },
      } = await axios({
        url: uploadURL,
        method: 'POST',
        data: formData,
      });
      onSuccess(imageUrl, file);
      return true;
    } catch (error) {
      createMessage.error('上传失败');
      console.log(error);
      onError(error);
      return false;
    }
  }

  function handleChange(info: Record<string, any>) {
    const file = info.file;
    const status = file?.status;
    const url = file?.response;
    const name = file?.name;

    if (status === 'uploading') {
      if (!uploading) {
        emit('uploading', name);
        uploading = true;
      }
    } else if (status === 'done') {
      emit('done', name, url);
      uploading = false;
    } else if (status === 'error') {
      emit('error');
      uploading = false;
    }
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-tinymce-img-upload';

  .@{prefix-cls} {
    position: absolute;
    z-index: 20;
    top: 4px;
    right: 10px;

    &.fullscreen {
      position: fixed;
      z-index: 10000;
    }
  }
</style>
