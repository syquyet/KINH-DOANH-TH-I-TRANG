import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  Res,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/untils/mail.service';
import { User } from '../users/entities/user.entity';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private emailService: EmailService,
    @Inject('FIREBASE_ADMIN') private firebaseAdmin: admin.app.App,
  ) {}
  async logIn(email: string, pass: string) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException({ message: 'email ko tồn tại' });
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new BadRequestException({ message: 'password ko đúng' });
    }
    const payload = { role: user.role, user_id: user.id };
    const token = await this.jwtService.signAsync(payload);

    return {
      data: {
        id: user.id,
        name: user.user_name,
        role: user.role,
        status: user.status,
      },
      access_token: token,
    };
  }

  async register(newUser: any) {
    const user = await this.authRepository.findByEmail(newUser.email);
    if (user) {
      throw new BadRequestException({
        status: false,
        message: 'email đã tồn tại',
      });
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(newUser.password, saltOrRounds);
    const data = {
      user_name: newUser.user_name,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
      password: hash,
      role: '0',
      status: 'activate',
      avatar:
        'https://facebookninja.vn/wp-content/uploads/2023/06/anh-dai-dien-mac-dinh-zalo.jpg',
    };
    const response = await this.authRepository.createUser(data);
    const html = this.emailService.templateRegister(data.user_name);
    const subject = 'Chào ' + newUser.user_name;

    this.emailService.sendMail(newUser.email, subject, html); //gửi mail cho người đăng ký thành công
    return { status: true, message: 'đăng ký thành công', data: response };
  }
  async fetchUser(user_id: number): Promise<User> {
    return this.authRepository.fetchUser(user_id);
  }
  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      const decodedToken = await this.firebaseAdmin
        .auth()
        .verifyIdToken(idToken);

      return decodedToken;
    } catch (error) {
      throw new BadRequestException('Token không hợp lệ');
    }
  }
  async loginGoogle(dataToken: any) {
    const decodedToken = await this.verifyToken(dataToken);
    let user = await this.authRepository.findByEmail(decodedToken.email);
    if (!user) {
      const newUser = {
        user_name: decodedToken.name,
        email: decodedToken.email,
        avatar: decodedToken.picture,
        role: '0',
        status: 'activate',
        phone: '',
        address: '',
      };
      user = await this.authRepository.createUser(newUser);
    }
    const payload = { role: user.role, user_id: user.id };
    const token = await this.jwtService.signAsync(payload);
    return {
      data: {
        id: user.id,
        name: user.user_name,
        role: user.role,
        status: user.status,
      },
      access_token: token,
    };
  }
}
