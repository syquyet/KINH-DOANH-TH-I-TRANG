import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/common/guards/author.guard';
import { UserDto } from './dto/users.dto';
import { UploadService } from '../upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateResult } from 'typeorm';
import { QueryInterface } from '../products/interfaces/queryProduct';

@Controller('users')
// @UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly uploadService: UploadService,
  ) {}

  @Get(':id')
  async findById(@Res() res, @Param('id') id: any) {
    try {
      const response = await this.usersService.findById(id);
      return res.json(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Post()
  async createUser(@Res() res, @Body() user: UserDto) {
    const newUser = { ...user, role: '0', status: 'activate' };
    try {
      const response = await this.usersService.createUser(newUser);
      return res.json(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    try {
      await this.usersService.deleteUserById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Delete('soft-delete/:id')
  async softDeleteUser(@Param('id') id: number) {
    try {
      await this.usersService.softDeleteUserById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Get('get/soft-delete')
  async getAllSoftDeletedUsers(@Res() res) {
    try {
      const response = await this.usersService.getAllSoftDeletedUsers();
      return res.json(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Patch('avatar/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateAvatarUser(
    @Param('id') id: number,
    @UploadedFile() file,
  ): Promise<UpdateResult> {
    
    try {
      const avatar = await this.uploadService.uploadFile(file, 'avatar');
      return this.usersService.updateAvatarUser(id, { avatar: avatar });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() data: any) {
    try {
      return await this.usersService.updateUser(id, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Patch('status/:id')
  async updateStatusUser(@Param('id') id: number) {
    try {
      return await this.usersService.updateStatusUser(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get()
  findProducts(@Query() query: QueryInterface) {
    try {
      return this.usersService.findAll(query);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
