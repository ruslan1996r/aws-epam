import { Inject, Injectable } from '@nestjs/common';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';
import { v4 } from 'uuid';

import { Cart } from '../models';

@Injectable()
export class CartService {
  constructor(@Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>) {}

  async findByUserName(userId: string): Promise<Cart> {
    const sqlQuery = `
      select * from public.carts where user_name = $1;
    `
    const [userCart] = await this.pg.any(sqlQuery, [userId]);

    const cartItemsQuery = `
      SELECT * FROM public.cart_items item 
      JOIN products p on p.id = item.product_id WHERE cart_id = $1;
    `

    const cart_items = await this.pg.any(cartItemsQuery, [userCart.id])

    return {
      id: userCart.id,
      items: cart_items
    };
  }

  async createByUserName(userName: string): Promise<Cart> {
    const sqlQuery = `
      INSERT INTO public.carts (user_name) VALUES ($1) returning *;
    `

    const userCart = await this.pg.one(sqlQuery, [userName]);

    return {
      id: userCart.id,
      items: []
    };
  }

  async findOrCreateByUserName(userName: string): Promise<Cart> {
    const userCart = await this.findByUserName(userName);

    if (userCart) {
      return userCart;
    }

    return this.createByUserName(userName);
  }
}
