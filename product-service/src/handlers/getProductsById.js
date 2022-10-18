import { Responses } from "../../common/responses";
import { logEvent } from '../../common/logEvent';
import { NotFoundError } from '../../common/errors/notFoundError';
import { getProductById } from '../services/productService';

const getProductsById = async (event) => {
  logEvent(event);

  try {
    const productId = event?.pathParameters?.productId || null;
    const productById = await getProductById(productId);

    if (!productById) {
      throw new NotFoundError(`Product with id "${productId}" was not found`)
    }

    return Responses._200(productById);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return Responses._404(error);
    }

    return Responses._500(error);
  }
};

export { getProductsById } 
