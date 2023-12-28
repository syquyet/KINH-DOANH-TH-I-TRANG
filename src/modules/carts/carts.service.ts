import { Injectable, NotFoundException } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { Cart } from './entities/cart.entity';
import { CartDto } from './dto/cart.dto';
import { UpdateResult } from 'typeorm';

@Injectable()
export class CartsService {
  constructor(private cartsRepository: CartsRepository) {}

  async createCart(dataCart: any) {
    const cartUser = await this.cartsRepository.findByUser(
      dataCart.user_id,
      dataCart.product_id,
    );

    if (!cartUser) {
      const carts = await this.cartsRepository.createCart({
        user_id: dataCart.user_id,
        product_id: dataCart.product_id,
        quantity: dataCart.quantity,
        size: dataCart.size,
      });
      return carts;
    }
    const newQuantity = cartUser.quantity + parseInt(dataCart.quantity, 0);
    cartUser.quantity = newQuantity;
    await this.cartsRepository.updateCart(cartUser);
  }
  async getCartByUser(id: number): Promise<Cart[]> {
    const response = await this.cartsRepository.getCartByUser(id);
    return response;
  }
  async updateCart(id: number, newCart: any): Promise<UpdateResult> {
    return this.cartsRepository.updateCartById(id, newCart);
  }
  async deleteCartById(id: number): Promise<void> {
    const cart = await this.cartsRepository.findById(id);
    if (!cart) {
      throw new NotFoundException(`cart with ID ${id} not found`);
    }
    this.cartsRepository.deleteCartbyid(cart);
  }
}
