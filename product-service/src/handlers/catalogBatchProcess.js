import { Responses } from "../../common/responses";
import { logEvent } from '../../common/logEvent';
import { createProducts } from "../services/productService";
import { sendProductsNotification } from "../services/notificationService";

const productsFromRecords = (records) => {
  const products = records.map(({ body }) => JSON.parse(body));

  const productsWithKeys = products.map(p => {
    const values = Object.values(p);

    return {
      id: values[0],
      title: values[1],
      description: values[2],
      price: values[3],
      count: values[4],
    }
  })

  return productsWithKeys;
}

const catalogBatchProcess = async (event) => {
  logEvent(event);
  const products = productsFromRecords(event.Records);

  try {
    await createProducts(products);
    await sendProductsNotification(products);

    return Responses._200({ products });
  } catch (error) {
    return Responses._500(error);
  }
};

export { catalogBatchProcess } 
