import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response, Request, response } from 'express';
import { AuthGuard } from 'src/common/guards/author.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Roles(Role.Admin, Role.User)
  async signIn(@Res() res: Response, @Body() body: LoginDto) {
    try {
      const response = await this.authService.logIn(body.email, body.password);
      res.setHeader('authorization', `Bearer ${response.access_token}`);
      return res.json(response.data);
    } catch (error) {
      throw error;
    }
  }
  @Post('register')
  async register(@Body() body: RegisterDto) {
    const newUser = {
      ...body,
    };
    try {
      const response = await this.authService.register(newUser);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get('fetch-user')
  @UseGuards(AuthGuard)
  async fetchUser(@Res() res, @Req() req) {
    try {
      const user = await this.authService.fetchUser(req.user.user_id);
      res.json({
        id: user.id,
        name: user.user_name,
        email: user.email,
        address: user.address,
        avatar: user.avatar,
        role: user.role,
        phone: user.phone,
      });
    } catch (error) {
      res.status(500).json({ message: 'token hết hạn' });
      throw error;
    }
  }
  @Get('login-google')
  async loginGoogle(@Res() res, @Req() req: Request) {
    try {
      const response = await this.authService.loginGoogle(
        req.headers.authorizationfb,
      );
      res.setHeader('authorization', `Bearer ${response.access_token}`);
      return res.json(response.data);
    } catch (error) {
      throw error;
    }
  }
}
