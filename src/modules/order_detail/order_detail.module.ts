import { Module } from '@nestjs/common';
import { OrderDetailController } from './order_detail.controller';
import { OrderDetailService } from './order_detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { Product } from '../products/entities/product.entity';
import { OrderDetailRepository } from './order_detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail, Product])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService,OrderDetailRepository],
})
export class OrderDetailModule {}
