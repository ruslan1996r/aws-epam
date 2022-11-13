import csv from "csv-parser";

import { logEvent } from "../../common/logEvent";
import { Responses } from "../../common/responses";
import { UPLOADED_FOLDER, PARSED_FOLDER, BUCKET } from "../../common/constants";
import { getS3 } from "../../common/s3Helpers";
import { getSQS } from "../../common/sqsHelpers";

const s3 = getS3();
const sqs = getSQS();

const onDataSendSQS = (chunk) => {
  if (Object.keys(chunk).length !== 5 || [...Object.values(chunk)][0] === 'id') return
  console.log("Data_chunk: ", chunk);
  console.log('process.env.SQS_NEW_PRODUCT_URL = ', process.env.SQS_NEW_PRODUCT_URL);

  sqs.sendMessage({
    QueueUrl: process.env.SQS_NEW_PRODUCT_URL,
    MessageBody: JSON.stringify(chunk)
  }, (err, data) => {
    console.log('Error = ', err);
    console.log('Data = ', data);

    console.log("Send message for new product: ", chunk)
  })
}

const csvParse = async ({ stream, key: fileKey }) => {
  return new Promise((resolve, reject) => {
    const chunks = []

    stream
      .pipe(csv({ headers: true }))
      .on('data', (chunk) => {
        chunks.push(chunk);
        onDataSendSQS(chunk)
      })
      .on('end', async () => {
        console.log(`Copy from ${BUCKET}/${fileKey}.`);
        console.log("ALL_CHUNKS: ", chunks)

        const newFileKey = fileKey.replace(UPLOADED_FOLDER, PARSED_FOLDER);

        console.log(`New file key: `, newFileKey)

        await s3.copyObject({
          Bucket: BUCKET,
          CopySource: `${BUCKET}/${fileKey}`,
          Key: newFileKey
        }).promise();

        await s3.deleteObject({
          Bucket: BUCKET,
          Key: fileKey
        }).promise();

        resolve()
      })
      .on('error', (err) => {
        console.log("CSV_PARSE_ERROR: ", data);
        reject(err)
      });
  })
}

const getS3Streams = async (records) => {
  return records.map(record => {
    const params = {
      Bucket: BUCKET,
      Key: record.s3.object.key,
    }

    return {
      stream: s3.getObject(params).createReadStream(),
      key: record.s3.object.key,
    }
  })
}

const importFileParser = async (event) => {
  logEvent(event);

  try {
    const streams = await getS3Streams(event?.Records);
    console.log("streamsstreams", streams)
    await Promise.all(streams.map(stream => csvParse(stream)));

    return Responses._200({ success: true });
  } catch (error) {
    return Responses._500(error);
  }
};

export { importFileParser };
