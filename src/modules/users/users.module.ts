import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { EmailService } from 'src/untils/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { cloudinaryConfig, multerConfig } from 'src/config/multer.config';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.registerAsync({
      useFactory: multerConfig,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository,UploadService],
})
export class UsersModule {
  constructor() {
    cloudinaryConfig();
  }
}
