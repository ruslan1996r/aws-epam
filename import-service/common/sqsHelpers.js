import { SQS } from "aws-sdk";
import { REGION } from "./constants";

export const getSQS = () => new SQS({
  region: REGION
});
