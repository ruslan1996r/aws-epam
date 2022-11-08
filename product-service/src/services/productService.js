
import Joi from "joi";
import { createClient } from './sqlClient';
import { ValidationError } from '../../common/errors/validationError';
import { insert } from '../../common/pgHelpers';

export const getProducts = async () => {
  const client = createClient();
  await client.connect();

  const sqlQuery = `
    select p.id, p.title, p.description, p.price, s.count
    from products p
    join stocks s on s.product_id = p.id
  `

  try {
    const { rows } = await client.query(sqlQuery);

    return rows;
  } catch (error) {
    console.log('ERROR [getProducts]: ', error)
  } finally {
    await client.end();
  }
}

export const getProductById = async (productId) => {
  const client = createClient();
  await client.connect();

  const sqlQuery = `
    select p.id, p.title, p.description, p.price, s.count
    from products p
    join stocks s on s.product_id = p.id
    where p.id=$1
  `

  try {
    const { rows } = await client.query(sqlQuery, [productId]);

    return rows;
  } catch (error) {
    console.log('ERROR [getProducts]: ', error)
  } finally {
    await client.end();
  }
}

const newProductSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().positive().precision(2),
  count: Joi.number().integer(),
});

export const createNewProduct = async (body) => {
  const { error } = newProductSchema.validate(body);
  console.log("MY_ERROR: ", error)

  if (error) throw new ValidationError(error);

  const client = createClient();
  await client.connect();
  const { title, description, price, count } = body;

  try {
    client.query('BEGIN');

    const sqlQuery = `
      insert into products (title, description, price)
      values ($1, $2, $3)
      returning *
    `;

    const { rows } = await client.query(sqlQuery, [title, description, price]);
    const createdProduct = rows[0];

    const sqlQueryStock = `insert into stocks (product_id, count) values($1, $2)`;
    await client.query(sqlQueryStock, [createdProduct.id, count]);

    await client.query('COMMIT');

    return createdProduct;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('ERROR [createNewProduct]: ', error);
  } finally {
    await client.end();
  }
}

export const createProducts = async (products) => {
  const client = createClient();
  await client.connect();

  try {
    client.query('BEGIN');

    const formattedProducts = products
      .map(({ title, description, price }) => ([title, description, price]));

    const productsInsertQuery = insert({
      table: 'products',
      keys: ['title', 'description', 'price'],
      values: formattedProducts,
    })

    const { rows } = await client.query(productsInsertQuery)
    const newProductIds = rows.map(({ id }) => id);

    const formattedCount = products.map(({ count }, index) => ([newProductIds[index], count]));
    const stockInsertQuery = insert({
      table: 'stocks',
      keys: ['product_id', 'count'],
      values: formattedCount,
    })

    await client.query(stockInsertQuery);
    await client.query('COMMIT');

    return newProductIds;
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('ERROR [createProducts]: ', error);
  } finally {
    await client.end();
  }
}
