import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { ProductsRepository } from '../products/products.repository';
import { OrderDetailRepository } from '../order_detail/order_detail.repository';
import { CartsRepository } from '../carts/carts.repository';
import { Product } from '../products/entities/product.entity';
import { OrderDetail } from '../order_detail/entities/order_detail.entity';
import { User } from '../users/entities/user.entity';
import { Cart } from '../carts/entities/cart.entity';
import { EmailService } from 'src/untils/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order,Product,OrderDetail,User,Cart
  ])],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    ProductsRepository,
    OrderDetailRepository,
    CartsRepository,
    EmailService
  ],
})
export class OrdersModule {}
