import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Not, Repository, UpdateResult } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  

 

  async findById(id: number): Promise<Category> {
    try {
      return this.categoriesRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw error;
    }
  }

  async createCategory(Category: Category): Promise<Category> {
    try {
      const newCategory = this.categoriesRepository.create(Category);
      return this.categoriesRepository.save(newCategory);
    } catch (error) {
      throw error;
    }
  }
  async deleteCategoryById(Category: Category): Promise<void> {
    try {
      await this.categoriesRepository.remove(Category);
    } catch (error) {
      throw error;
    }
  }
  async softDeleteCategoryById(id: number): Promise<UpdateResult> {
    try {
      return this.categoriesRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async getAllSoftDeletedCategories(): Promise<Category[]> {
    try {
      return this.categoriesRepository.find({
        where: { deletedAt: Not(null) },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(id: number, data: any): Promise<UpdateResult> {
    try {
      return this.categoriesRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  }
  async updateStatusCategory(id: number, data: any): Promise<UpdateResult> {
    try {
      return this.categoriesRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  }
  async findAll(
    queryObject: FindManyOptions<Category>,
  ): Promise<{ data: Category[]; totalCount: number }> {
    try {
      const [data, totalCount] =
        await this.categoriesRepository.findAndCount(queryObject);
      return {
        data,
        totalCount,
      };
    } catch (error) {
      throw error;
    }
  }
}
