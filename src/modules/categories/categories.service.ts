import { Injectable, NotFoundException } from '@nestjs/common';

import { Like, UpdateResult } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoriesRepository } from './categories.repository';
import { QueryInterface } from '../products/interfaces/queryProduct';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}
  async findById(id: number): Promise<Category> {
    const response = await this.categoriesRepository.findById(id);
    return response;
  }
  async createCategory(Category: any): Promise<Category> {
    const response = await this.categoriesRepository.createCategory(Category);
    return response;
  }
  async deleteCategoryById(id: number): Promise<void> {
    const Category = await this.categoriesRepository.findById(id);
    if (!Category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.categoriesRepository.deleteCategoryById(Category);
  }
  async softDeleteCategoryById(id: number): Promise<UpdateResult> {
    const Category = await this.categoriesRepository.findById(id);

    if (!Category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.categoriesRepository.softDeleteCategoryById(id);
  }
  async getAllSoftDeletedCategories(): Promise<Category[]> {
    const response =
      await this.categoriesRepository.getAllSoftDeletedCategories();
    return response;
  }
  async updateCategory(id: number, data: any): Promise<UpdateResult> {
    return this.categoriesRepository.updateCategory(id, data);
  }
  async updateStatusCategory(id: number): Promise<UpdateResult> {
    let data = {};
    const Category = await this.categoriesRepository.findById(id);
    if (!Category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    if (Category.status === '0') {
      data = { status: '1' };
    } else {
      data = { status: '0' };
    }
    return this.categoriesRepository.updateStatusCategory(id, data);
  }
  async findAll(query: QueryInterface): Promise<{ data: Category[]; totalCount: number }> {
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
    return await this.categoriesRepository.findAll(queryObject);
  }
}
