import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { cloudinaryConfig, multerConfig } from 'src/config/multer.config';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    MulterModule.registerAsync({
      useFactory: multerConfig,
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, UploadService],
})
export class ProductsModule {
  constructor() {
    cloudinaryConfig();
  }
}
