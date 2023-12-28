import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/products.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';
import { QueryInterface } from './interfaces/queryProduct';
import { Request } from 'express';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('product_img'))
  async createProduct(
    @UploadedFile() file,
    @Res() res,
    @Body() product: ProductDto,
  ) {
    const imageProduct = await this.uploadService.uploadFile(file, 'product');
    const newProduct = { ...product, product_img: imageProduct };
    try {
      const response = await this.productsService.createProduct(newProduct);
      return res.json(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get(':id')
  async findById(@Res() res, @Param('id') id: number) {
    try {
      const response = await this.productsService.findById(id);
      return res.json(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    try {
      await this.productsService.deleteProductById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Delete('soft-delete/:id')
  async softDeleteProduct(@Param('id') id: number){
    try {
      await this.productsService.softDeleteProductById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Get('get/soft-delete')
  async getAllSoftDeletedProducts(@Res() res) {
    
    try {
      const response = await this.productsService.getAllSoftDeletedProducts();
      return res.json(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('product_img'))
  async updateProduct(
    @UploadedFile() file,
    @Param('id') id: number,
    @Body() product: ProductDto,
  ) {
    const newProduct = { ...product };
    if (!product.product_img) {
      const imageProduct = await this.uploadService.uploadFile(file, 'product');
      newProduct.product_img = imageProduct;
    }

    try {
      return await this.productsService.updateProduct(id, newProduct);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get('category/:category')
  getProductsByCategory(@Param('category') category: string) {
    try {
      return this.productsService.getProductsByCategoryId(category);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Get()
  findProducts(@Query() query: QueryInterface) {
    try {
      return this.productsService.findAll(query);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Post('file')
  async createManyProduct(@Body() body) {
    if (!body.dataCSV) {
      throw new Error('chưa chọn file import');
    }
    try {
      return await this.productsService.createManyProduct(body.dataCSV);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
