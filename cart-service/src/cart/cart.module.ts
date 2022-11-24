import { OrderService } from './../order/services/order.service';
import { UsersModule } from './../users/users.module';
import { UsersService } from './../users/services/users.service';
import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';


@Module({
  imports: [OrderModule, UsersModule],
  providers: [CartService, OrderService, UsersService],
  controllers: [CartController]
})
export class CartModule {}
