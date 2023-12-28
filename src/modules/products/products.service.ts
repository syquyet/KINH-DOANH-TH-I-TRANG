import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';
import { Like, UpdateResult } from 'typeorm';
import { QueryInterface } from './interfaces/queryProduct';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async createProduct(product: any): Promise<Product> {
    const response = await this.productsRepository.createProduct(product);
    return response;
  }
  async findById(id: number): Promise<Product> {
    const response = await this.productsRepository.findById(id);
    return response;
  }

  async deleteProductById(id: number): Promise<void> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.productsRepository.deleteProductById(product);
  }
  async softDeleteProductById(id: number): Promise<UpdateResult> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.productsRepository.softDeleteProductById(id);
  }
  async getAllSoftDeletedProducts(): Promise<Product[]> {
    const response = await this.productsRepository.getAllSoftDeletedProducts();
    return response;
  }

  async updateProduct(id: number, data: any): Promise<UpdateResult> {
    return this.productsRepository.updateProduct(id, data);
  }

  async getProductsByCategoryId(category: string): Promise<Product[]> {
    return this.productsRepository.findProductsByCategoryId(category);
  }
  async findAll(query: QueryInterface): Promise<{ data: Product[]; totalCount: number }> {
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
    return await this.productsRepository.findAll(queryObject);
  }
  async createManyProduct(data: any[]) {
    return await this.productsRepository.insertMany(data);
  }
}
