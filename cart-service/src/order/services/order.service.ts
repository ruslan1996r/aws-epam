import { Inject, Injectable } from '@nestjs/common';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';
import { v4 } from 'uuid';

import { Order } from '../models';

@Injectable()
export class OrderService {
  constructor(@Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>) {}
  private orders: Record<string, Order> = {}

  findById(orderId: string): Order {
    return this.orders[orderId];
  }

  async createOrder(data: any) {
    const { userName, cartId, total, comments, payment, delivery } = data;
    const status = 'pending';

    const sqlQuery = `
      INSERT INTO public.orders (user_id, cart_id, payment, delivery, comments, status, total) VALUES
      ($1, $2, $3, $4, $5, $6, $7) returning *;
    `

    //* Creating new Order with Transaction
    const newOrder = await this.pg.tx(async (t) => {
      return await t.one(sqlQuery, [
        userName, cartId, payment, delivery, comments, status, total
      ])
    })

    if (newOrder) {
      return newOrder
    }

    return null;
  }

  update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orders[orderId] = {
      ...data,
      id: orderId,
    }
  }
}
