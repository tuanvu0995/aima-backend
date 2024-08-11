import { Product } from '@modules/product/product.entity';
import { Supplier } from '@modules/supplier/supplier.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Sale } from '../sale.entity';

@Injectable()
export class SaleSeeder implements Seeder {
  private readonly logger = new Logger(SaleSeeder.name);
  constructor(
    @InjectRepository(Sale) private readonly sale: Repository<Sale>,
    @InjectRepository(Product) private readonly product: Repository<Product>,
    @InjectRepository(Supplier) private readonly supplier: Repository<Supplier>,
  ) {}

  async seed(): Promise<any> {
    this.logger.log('Seeding sales');

    // last 6 months array
    const dates = Array.from({ length: 6 }, (_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() - index);
      return date;
    });

    for (const [index, date] of dates.entries()) {
      this.logger.log(`Creating sales for ${date.toDateString()}`);
      await this.createSale(date, index === 0);
    }
  }

  async createSale(date: Date, updateStock: boolean) {
    const products = await this.product.find();

    for (const product of products) {
      // from 0 to 500 sales
      const count = Math.floor(Math.random() * 500);
      for (let index = 0; index < count; index++) {
        if (product.stock === 0) {
          break;
        }

        // random from 1 to 30
        const quantity = Math.floor(Math.random() * 30) + 1;
        const sale = this.sale.create({
          product,
          quantity,
          price: product.price,
          createdAt: date,
          updatedAt: date,
        });
        await this.sale.save(sale);
        if (updateStock) {
          const pro = await this.product.findOne({ where: { id: product.id } });
          pro.stock = Math.max(0, pro.stock - quantity);
          await this.product.save(pro);
        }
      }
    }
  }

  async drop(): Promise<any> {
    return this.sale.delete({});
  }
}
