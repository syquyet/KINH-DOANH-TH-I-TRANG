import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './dto/orders.dto';
import { QueryInterface } from '../products/interfaces/queryProduct';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  async createCart(@Res() res, @Body() body: OrderDto) {
    try {
      const response = await this.orderService.createOrder(body);
      return res.json(response);
    } catch (error) {
      throw error;
    }
  }
  @Get(':id')
  async getOrderByUser(@Res() res, @Param('id') id: any) {
    try {
      const response = await this.orderService.getOrderByUser(id);
      return res.json(response);
    } catch (error) {
      throw error;
    }
  }
  @Get()
  findOrder(@Query() query: QueryInterface) {
    try {
      return this.orderService.findAll(query);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Put(':id')
  updateOrder(@Body() data: any, @Param('id') id: number) {
    try {
      return this.orderService.updateOrder(id, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
