import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartsRepository {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
  ) {}
  async findById(id: number): Promise<Cart> {
    try {
      return this.cartsRepository.findOne({ where: { id: id } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async findByUser(user_id: number, product_id: number): Promise<Cart> {
    try {
      return this.cartsRepository.findOne({
        where: { user_id: user_id, product_id: product_id },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async createCart(dataCart: CartDto): Promise<Cart> {
    try {
      const newCart = await this.cartsRepository.create(dataCart);
      return this.cartsRepository.save(newCart);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateCart(dataCart: any): Promise<UpdateResult> {
    try {
      return this.cartsRepository.update(dataCart.id, {
        quantity: dataCart.quantity,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getCartByUser(id: number): Promise<Cart[]> {
    try {
      return this.cartsRepository.find({
        where: { user_id: id },
        relations: ['product'],
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateCartById(id: number, newCart: any): Promise<UpdateResult> {
    try {
      return this.cartsRepository.update(id, newCart);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async deleteCartbyid(cart: Cart): Promise<void> {
    try {
      this.cartsRepository.remove(cart);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
