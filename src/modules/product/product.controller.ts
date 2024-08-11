import { CrudController } from '@common/controllers/crud.controller';
import { Controller } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController extends CrudController<Product> {
  constructor(protected readonly productService: ProductService) {
    super(productService);
  }
}
