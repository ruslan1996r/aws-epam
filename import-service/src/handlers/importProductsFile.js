import { logEvent } from "../../common/logEvent";
import { Responses } from "../../common/responses";
import { UPLOADED_FOLDER, BUCKET, EXPIRES_IN } from "../../common/constants";
import { getS3 } from "../../common/s3Helpers";

//* PresignedURL используется как PUT-method. Файлы можно передать в качестве form-data
//* Чтобы загружать файлы через signedUrl, надо настроить CORS: permissions -> CORS
const importProductsFile = async (event) => {
  logEvent(event);

  try {
    const fileName = event?.pathParameters?.fileName || null;
    const filePath = `${UPLOADED_FOLDER}/${fileName}`;
    const s3 = getS3();

    const params = {
      Bucket: BUCKET,
      Key: filePath,
      Expires: EXPIRES_IN,
      ContentType: 'text/csv',
    }

    const url = await s3.getSignedUrlPromise('putObject', params);

    return Responses._200({ url });
  } catch (error) {
    return Responses._500(error);
  }
};

export { importProductsFile } 
