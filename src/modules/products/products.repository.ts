import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {
  EntityManager,
  FindManyOptions,
  Like,
  Not,
  OrderByCondition,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryInterface } from './interfaces/queryProduct';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async createProduct(user: Product): Promise<Product> {
    try {
      const newProduct = this.productsRepository.create(user);
      return this.productsRepository.save(newProduct);
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    queryObject: FindManyOptions<Product>,
  ): Promise<{ data: Product[]; totalCount: number }> {
    try {
      const [data, totalCount] =
        await this.productsRepository.findAndCount(queryObject);
      return {
        data,
        totalCount,
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<Product> {
    try {
      return this.productsRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw error;
    }
  }

  async deleteProductById(product: Product): Promise<void> {
    try {
      await this.productsRepository.remove(product);
    } catch (error) {
      throw error;
    }
  }

  async softDeleteProductById(id: number): Promise<UpdateResult> {
    try {
      return this.productsRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async getAllSoftDeletedProducts(): Promise<Product[]> {
    try {
      return this.productsRepository.find({ where: { deletedAt: Not(null) } });
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(
    id: number,
    data: any,
    transactionalEntityManager?: EntityManager,
  ): Promise<UpdateResult> {
    try {
      if (transactionalEntityManager) {
        return transactionalEntityManager.update(Product, id, data);
      }
      return this.productsRepository.update(id, data);
    } catch (error) {
      throw new BadRequestException('Sản phẩm không thể order');
      throw error;
    }
  }

  findProductsByCategoryId(category: string): Promise<Product[]> {
    try {
      return this.productsRepository.find({
        where: { category_name: category },
      });
    } catch (error) {
      throw error;
    }
  }
  
  async insertMany(data: any[]) {
    try {
      const productEntity = this.productsRepository.create(data);
      return this.productsRepository.save(productEntity);
    } catch (error) {
      throw error;
    }
  }
}
