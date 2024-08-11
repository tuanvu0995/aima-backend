import { CrudController } from '@common/controllers/crud.controller';
import { ApiAuthGuard } from '@modules/auth/guards';
import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dtos/product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController extends CrudController<Product> {
  constructor(protected readonly productService: ProductService) {
    super(productService);
  }

  @Post('')
  @UseGuards(ApiAuthGuard)
  async create(@Body() createInput: CreateProductDto): Promise<Product> {
    return await this.productService.create(createInput);
  }

  @Patch('/:id')
  @UseGuards(ApiAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateInput: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.update(id, updateInput);
  }
}
