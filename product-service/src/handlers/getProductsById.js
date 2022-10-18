import { products } from '../../mock';

import { Responses } from "../../common/responses";
import { NotFoundError } from '../../common/errors/notFoundError';

const getProductsById = async (event) => {
  try {
    const productId = event?.pathParameters?.productId || null;
    const productById = products.find(product => product.id === productId);

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
