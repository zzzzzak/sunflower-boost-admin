import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '@/utils/http/axios';
import { UploadFileParams } from '#/axios';
import { AxiosProgressEvent } from 'axios';
import { GetUploadPath } from '../admin';

/**
 * @description: Upload interface
 */
export async function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
) {
  const { uploadURL } = await GetUploadPath(
    params?.file?.name
      ? {
          filename: params?.file?.name,
        }
      : {},
  );
  return defHttp
    .uploadFile<UploadApiResult>(
      {
        baseURL: uploadURL,
        onUploadProgress,
      },
      params,
    )
    .then((res: any) => {
      res.data.url = res?.data?.result?.variants?.[0];
      return res;
    });
}
