import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { CartDto } from './dto/cart.dto';
import { UpdateResult } from 'typeorm';
import { Response } from 'express';

@Controller('carts')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Post()
  async createCart(@Res() res, @Body() body: CartDto) {
    try {
      const response = this.cartsService.createCart(body);
      return res.json({
        mesage: 'thêm sản phẩm vào cart thành công',
        data: response,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Get(':id')
  async getCartByUser(@Res() res, @Param('id') id: number) {
    try {
      const response = await this.cartsService.getCartByUser(id);

      return res.json(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Put(':id')
  async updateCart(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() newCart: any,
  ) {
    try {
      await this.cartsService.updateCart(id, newCart);
      return res.status(200).json('success');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Delete(':id')
  async deleteCartById(@Res() res, @Param('id') id: number) {
    try {
    await  this.cartsService.deleteCartById(id);
    } catch (error) {
      throw error;
    }
  }
}
