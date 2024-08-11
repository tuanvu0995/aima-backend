import { Supplier } from '@modules/supplier/supplier.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Product } from '../product.entity';

@Injectable()
export class ProductSeeder implements Seeder {
  private readonly logger = new Logger(ProductSeeder.name);
  constructor(
    @InjectRepository(Product) private readonly product: Repository<Product>,
    @InjectRepository(Supplier) private readonly supplier: Repository<Supplier>,
  ) {}

  async seed(): Promise<any> {
    this.logger.log('Seeding products');
    const suppliers = await this.supplier.find();

    for (const supplier of suppliers) {
      // from 10 to 50 products
      const count = Math.floor(Math.random() * 40) + 10;
      const products = DataFactory.createForClass(Product).generate(count);

      products.forEach((product) => {
        product.supplier = supplier;
        product.restockThreshold = 50;
      });

      await this.product.save(this.product.create(products));
    }
  }

  async drop(): Promise<any> {
    return this.product.delete({});
  }
}
