import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartsRepository } from './carts.repository';
import { Product } from '../products/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cart,Product])],
  controllers: [CartsController],
  providers: [CartsService,CartsRepository]
})
export class CartsModule {}
