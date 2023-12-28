import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { UploadFileCSV } from './common/middlewares/uploadCSV.middleware';
config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ exposedHeaders: ['authorization'] });
  // const uploadFileCSV = new UploadFileCSV();
  // app.use(uploadFileCSV.use.bind(uploadFileCSV));
  await app.listen(3000);
}
bootstrap();
