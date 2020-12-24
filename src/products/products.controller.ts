import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ApiUseTags, ApiCreatedResponse, ApiImplicitHeader, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiImplicitParam } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from './../auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';

import { ProductsService } from './products.service';

@ApiUseTags('Product')
@Controller('products')
@UseGuards(RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({title: '-> Create one product <-',})
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'Bearer',
    description: 'the token we need for create product.'
})
  @ApiCreatedResponse({})
  async addProductDto(@Body() createProductDto: CreateProductDto) {
        return await this.productsService.createProduct(createProductDto);
    }


  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({title: '-> Get All products -<',})
  @ApiOkResponse({})
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({title: '-> Get One product <-',})
  @ApiImplicitParam({name: 'id', description: 'id of article'})
  @ApiOkResponse({})
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
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
      prodDate,
      prodImg,
    );
    return null;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({title: '-> Delete one product <-',})
  @ApiBearerAuth()
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
