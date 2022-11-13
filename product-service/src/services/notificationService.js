import { SNS } from "aws-sdk";

const sns = new SNS({ region: process.env.REGION })

const sendNotification = async (products, limitedQuantity = false) => {
  try {
    const result = await sns.publish({
      Subject: `New ${limitedQuantity ? 'limited' : ''} products are created!`,
      Message: JSON.stringify(products),
      TopicArn: process.env.SNS_ARN,
      MessageAttributes: {
        IsExpensive: {
          DataType: "String",
          StringValue: limitedQuantity.toString()
        }
      }
    }).promise();

    console.log('Send notification for ', products, " with result ", result);
  } catch (error) {
    console.log('Send notification for ', products, 'with error ', error)
  }
};


export const sendProductsNotification = async (products) => {
  const limitedProducts = []
  const regularProducts = []

  products.forEach(product => {
    if (products.count < 4) {
      limitedProducts.push(product);
    } else {
      regularProducts.push(product);
    }
  });

  if (limitedProducts.length) {
    await sendNotification(limitedProducts, true);
  }

  if (regularProducts.length) {
    await sendNotification(regularProducts, false);
  }
}
