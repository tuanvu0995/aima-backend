import { DatabaseModule } from '@modules/database';
import { HashModule } from '@modules/hash';
import { Product } from '@modules/product/product.entity';
import { ProductSeeder } from '@modules/product/seeds/product.seed';
import { Sale } from '@modules/sale/sale.entity';
import { SupplierSeeder } from '@modules/supplier/seeds/supplier.seed';
import { Supplier } from '@modules/supplier/supplier.entity';
import { UsersSeeder } from '@modules/user/seeds/user.seed';
import { User } from '@modules/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';

import { SaleSeeder } from '@modules/sale/seeds/sale.seed';
import { config } from 'dotenv';

config();

seeder({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Supplier, Product, Sale]),
    HashModule,
  ],
}).run([UsersSeeder, SupplierSeeder, ProductSeeder, SaleSeeder]);
