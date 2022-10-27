import { S3 } from "aws-sdk";
import { REGION } from "./constants";

export const getS3 = () => new S3({
  region: REGION,
  httpOptions: {
    timeout: 60,
  },
});
