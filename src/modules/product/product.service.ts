import { CrudService } from '@common/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService extends CrudService<Product> {
  constructor(
    @InjectRepository(Product)
    protected readonly productRepo: Repository<Product>,
  ) {
    super(productRepo);
  }
}
