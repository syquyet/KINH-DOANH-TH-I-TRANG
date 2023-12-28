import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { OrderDto } from './dto/orders.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}
  async createOrder(dataCart: OrderDto): Promise<Order> {
    try {
      const newOrder = this.ordersRepository.create(dataCart);

      return this.ordersRepository.save(newOrder);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getOrderByUser(id: number): Promise<Order[]> {
    try {
      return this.ordersRepository.find({ where: { user_id: id } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async findAll(
    queryObject: FindManyOptions<Order>,
  ): Promise<{ data: Order[]; totalCount: number }> {
    try {
      const [data, totalCount] =
        await this.ordersRepository.findAndCount(queryObject);
      return {
        data,
        totalCount,
      };
    } catch (error) {
      throw error;
    }
  }
  async updateOrder(id: number, data: any): Promise<UpdateResult> {
    try {
      return this.ordersRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  }
}
