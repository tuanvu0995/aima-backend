import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { Supplier } from '../supplier.entity';

@Injectable()
export class SupplierSeeder implements Seeder {
  private readonly logger = new Logger(SupplierSeeder.name);
  constructor(
    @InjectRepository(Supplier) private readonly supplier: Repository<Supplier>,
  ) {}

  async seed(): Promise<any> {
    this.logger.log('Seeding suppliers');
    const supplierData = [
      {
        name: 'Adidas',
        code: 'ADIDAS',
        address: '123 Street, City, Country',
      },
      {
        name: 'Nike',
        code: 'NIKE',
        address: '456 Street, City, Country',
      },
      {
        name: 'Puma',
        code: 'PUMA',
        address: '789 Street, City, Country',
      },
    ];

    await this.supplier.save(this.supplier.create(supplierData as any[]));
    this.logger.log(`${supplierData.length} suppliers created`);
  }

  async drop(): Promise<any> {
    return this.supplier.delete({});
  }
}
