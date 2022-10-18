import { logEvent } from "../../common/logEvent";
import { Responses } from "../../common/responses";
import { getProducts } from '../services/productService';

const getProductsList = async (event) => {
  logEvent(event);

  try {
    const products = await getProducts();
    return Responses._200(products);
  } catch (error) {
    return Responses._500(error);
  }
};

export { getProductsList } 
