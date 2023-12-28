import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { cloudinaryConfig, multerConfig } from 'src/config/multer.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerConfig,
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {
  constructor() {
    cloudinaryConfig();
  }
}
