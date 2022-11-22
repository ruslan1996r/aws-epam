import { UsersModule } from './users/users.module';
import { UsersService } from './users/services/users.service';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestPgpromiseModule } from 'nestjs-pgpromise';


@Module({
  imports: [
    NestPgpromiseModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          connection: {
            host: configService.get('HOST'),
            port: Number(configService.get('DB_PORT')),
            user: configService.get('DB_USER'),
            password: configService.get('PASSWORD'),
            database: configService.get('DATABASE'),
          }
        }
      },
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CartModule,
    OrderModule,
    UsersModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [UsersService],
})
export class AppModule {}
