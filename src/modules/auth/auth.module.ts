import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/untils/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import * as admin from 'firebase-admin';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1d' }, // Thời gian hiệu lực của token
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    EmailService,
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        const serviceAccount = require('../../../firebase-service.json');
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        return admin;
      },
    },
  ],
})
export class AuthModule {}
