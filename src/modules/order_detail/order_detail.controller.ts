import { Controller, Get, Param, Res } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private orderDetailService: OrderDetailService) {}
  @Get(':id')
  async getOrderById(@Res() res, @Param('id') id: number) {
    try {
      const response = await this.orderDetailService.getOrdertById(id);
      return res.json(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
