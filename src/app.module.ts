import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import typeOrmConfig from './config/typeOrm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsModule } from './modules/carts/carts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderDetailModule } from './modules/order_detail/order_detail.module';
import { UploadFileCSV } from './common/middlewares/uploadCSV.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    AuthModule,
    UploadModule,
    CartsModule,
    OrdersModule,
    OrderDetailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('users'); // sử dụng middleware
    consumer.apply(UploadFileCSV).forRoutes('products/file'); // sử dụng middleware để import data

  }
}
