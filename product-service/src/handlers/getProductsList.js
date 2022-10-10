import { Responses } from "../../common/responses";
import { products } from '../../mock';

const getProductsList = async () => {
  try {
    return Responses._200(products);
  } catch (error) {
    return Responses._500(error);
  }
};

export { getProductsList } 
