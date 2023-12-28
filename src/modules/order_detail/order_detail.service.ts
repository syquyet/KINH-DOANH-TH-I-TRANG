import { Injectable } from '@nestjs/common';
import { OrderDetailRepository } from './order_detail.repository';
import { OrderDetail } from './entities/order_detail.entity';

@Injectable()
export class OrderDetailService {
  constructor(private orderDetailRepository: OrderDetailRepository) { }
  async getOrdertById(id: number): Promise<OrderDetail[]> {
    const response = await this.orderDetailRepository.getOrderDetailByorderId(id);
    return response;
  }
}
