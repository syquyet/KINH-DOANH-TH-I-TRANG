import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { Repository } from 'typeorm';
import { OrderDetailDto } from './dto/order_detail.dto';

@Injectable()
export class OrderDetailRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private ordersDetailRepository: Repository<OrderDetail>,
  ) {}

  async createOrderDetail(dataCart: OrderDetailDto): Promise<OrderDetail> {
    try {
      const newOrder = this.ordersDetailRepository.create(dataCart);
      return this.ordersDetailRepository.save(newOrder);
    } catch (error) {
      throw error;
    }
  }
  async getOrderDetailByorderId(order_id: number): Promise<OrderDetail[]> {
    try {
      return this.ordersDetailRepository.find({
        where: { order_id: order_id },
        relations: ['product'],
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
