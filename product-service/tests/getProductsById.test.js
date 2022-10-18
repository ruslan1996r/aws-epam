import { getProductsById } from '../src/handlers';
import { products } from '../mock';

describe("getProductsById", () => {
  it("should returns product by id", async () => {
    const productId = "1";
    const event = {
      pathParameters: {
        productId,
      }
    }

    const data = await getProductsById(event);

    expect(data.statusCode).toBe(200);
    expect(JSON.parse(data.body)).toEqual(products.find(product => product.id === productId));
  });

  it("should returns 404 error", async () => {
    const productId = "123";
    const event = {
      pathParameters: {
        productId,
      }
    }

    const data = await getProductsById(event);

    expect(data.statusCode).toBe(404);
    expect(JSON.parse(data.body)).toEqual({ error: `Product with id "${productId}" was not found` });
  });
});
