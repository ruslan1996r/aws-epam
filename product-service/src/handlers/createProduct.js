import { Responses } from "../../common/responses";
import { ValidationError } from '../../common/errors/validationError';
import { logEvent } from '../../common/logEvent';
import { createNewProduct } from '../services/productService';

const createProduct = async (event) => {
  logEvent(event);

  try {
    const body = JSON.parse(event.body);
    const newProduct = await createNewProduct(body);

    return Responses._200({ success: true, newProduct });
  } catch (error) {
    if (error instanceof ValidationError) {
      return Responses._422(error);
    }

    return Responses._500(error);
  }
};

export { createProduct };
