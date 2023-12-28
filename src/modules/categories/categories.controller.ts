import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryDto } from './dto/categories.dto';
import { CategoriesService } from './categories.service';
import { QueryInterface } from '../products/interfaces/queryProduct';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get(':id')
  async findById(@Res() res, @Param('id') id: number) {
    try {
      const response = await this.categoriesService.findById(id);
      return res.json(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Post()
  async createUser(@Res() res, @Body() category: CategoryDto) {
    const newCategory = { ...category, status: '1' };
    try {
      const response = await this.categoriesService.createCategory(newCategory);
      return res.json(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    try {
      await this.categoriesService.deleteCategoryById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Delete('soft-delete/:id')
  async softDeleteCategory(@Param('id') id: number) {
    try {
      await this.categoriesService.softDeleteCategoryById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Get('get/soft-delete')
  async getAllSoftDeletedCategorys(@Res() res) {
    try {
      const response =
        await this.categoriesService.getAllSoftDeletedCategories();
      return res.json(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Put(':id')
  async updateCategory(@Param('id') id: number, @Body() data: any) {
    try {
      return await this.categoriesService.updateCategory(id, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Patch('status/:id')
  async updateStatusCategory(@Param('id') id: number) {
    try {
      return await this.categoriesService.updateStatusCategory(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Get()
  findCategories(@Query() query: QueryInterface) {
    try {
      return this.categoriesService.findAll(query);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
