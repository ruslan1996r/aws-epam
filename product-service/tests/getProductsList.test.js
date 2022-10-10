import { getProductsList } from '../src/handlers/getProductsList';
import { products } from '../mock';

describe("getProductsList", () => {
  it("should returns all products", async () => {
    const data = await getProductsList();

    expect(data.statusCode).toBe(200);
    expect(JSON.parse(data.body)).toEqual(products);
  });
});
