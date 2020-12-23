import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUseTags,
  ApiBearerAuth,
  ApiImplicitHeader,
  ApiOperation,
  } from '@nestjs/swagger';

import { ProductsService } from './products.service';

@ApiUseTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('date_posted') prodDate: string,
    @Body('img') prodImg: string,
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
      prodDate,
      prodImg,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('date_posted') prodDate: string,
    @Body('img') prodImg: string,
  ) {
    await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice, prodDate, prodImg);
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
      await this.productsService.deleteProduct(prodId);
      return null;
  }
}