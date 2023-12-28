import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { ProductsRepository } from '../products/products.repository';
import { OrderDetailRepository } from '../order_detail/order_detail.repository';
import { CartsRepository } from '../carts/carts.repository';
import { Order } from './entities/orders.entity';
import { QueryInterface } from '../products/interfaces/queryProduct';
import { Like, UpdateResult } from 'typeorm';
import { EmailService } from 'src/untils/mail.service';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private productsRepository: ProductsRepository,
    private orderDetailRepository: OrderDetailRepository,
    private cartsRepository: CartsRepository,
    private emailService: EmailService,
  ) {}

  async createOrder(dataOder: any) {
    try {
      if (dataOder.cartUser.length == 0) {
        return {
          status: false,
          message: 'giỏ hàng bạn trống! ',
        };
      }
      for (const cart of dataOder.cartUser) {
        const product = await this.productsRepository.findById(cart.product_id);
        if (product.quantity < cart.quantity) {
          return {
            status: false,
            message:
              product.product_name + 'Số lượng vượt quá ' + product.quantity,
          };
        }
      }

      const totalPrice = dataOder.cartUser.reduce(
        (sum, item) => sum + item.product.product_price * item.quantity,
        0,
      );

      const orderUser = await this.ordersRepository.createOrder({
        user_id: dataOder.user_id,
        user_name: dataOder.user_name,
        email: dataOder.email,
        phone: dataOder.phone,
        total: totalPrice,
        status: 'pending',
        note: dataOder.note,
        delivery_address: dataOder.delivery_address,
      });

      for (const cart of dataOder.cartUser) {
        const orderDetail = {
          product_id: cart.product_id,
          quantity: cart.quantity,
          size: cart.size,
          order_id: orderUser.id,
        };
        await this.orderDetailRepository.createOrderDetail(orderDetail);
        const product = await this.productsRepository.findById(cart.product_id);
        await this.productsRepository.updateProduct(cart.product_id, {
          quantity: product.quantity - cart.quantity,
        });
        await this.cartsRepository.deleteCartbyid(cart);
      }
      const orderDetail =
        await this.orderDetailRepository.getOrderDetailByorderId(orderUser.id);

      const html = this.emailService.templateOrder(orderDetail);
      const subject = 'Chào ' + dataOder.user_name;
      this.emailService.sendMail(dataOder.email, subject, html);
      return { message: 'Order thành công!', status: true };
    } catch (error) {
      throw error;
    }
  }
  async getOrderByUser(id: any): Promise<Order[]> {
    const response = await this.ordersRepository.getOrderByUser(id);
    return response;
  }
  async findAll(
    query: QueryInterface,
  ): Promise<{ data: Order[]; totalCount: number }> {
    const queryObject = {};
    if (query.searchKey && query.searchValue) {
      (queryObject as any).where = {
        [query.searchKey]: Like(`%${query.searchValue}%`),
      };
    }
    if (query.sortKey && query.sortValue) {
      (queryObject as any).order = { [query.sortKey]: query.sortValue };
    }
    if (query.page && query.pageSize) {
      (queryObject as any).skip = (query.page - 1) * query.pageSize;
      (queryObject as any).take = query.pageSize;
    }
    return await this.ordersRepository.findAll(queryObject);
  }
  async updateOrder(id: number, data: any): Promise<UpdateResult> {
    return this.ordersRepository.updateOrder(id, data);
  }
}
