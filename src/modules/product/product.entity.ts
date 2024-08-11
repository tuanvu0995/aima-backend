import { CoreEntity } from '@common/entities';
import { Sale } from '@modules/sale/sale.entity';
import { Supplier } from '@modules/supplier/supplier.entity';
import { Factory } from 'nestjs-seeder';
import { Column, Entity, Index, ManyToOne, OneToMany, Relation } from 'typeorm';

@Entity('products')
@Index(['sku'], { unique: true })
@Index(['sku', 'deletedAt'])
export class Product extends CoreEntity {
  @Factory((faker) => faker.commerce.productName())
  @Column()
  name: string;

  @Factory((faker) => faker.string.alphanumeric(6))
  @Column()
  sku: string;

  @Factory((faker) => faker.commerce.productDescription())
  @Column()
  description: string;

  @Factory((faker) => faker.commerce.price({ min: 2, max: 1000 }))
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Factory((faker) =>
    faker.helpers.rangeToNumber({
      min: 500,
      max: 1500,
    }),
  )
  @Column()
  stock: number;

  @Column({ default: 40 })
  restockThreshold: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  @Index()
  supplier: Relation<Supplier>;

  @OneToMany(() => Sale, (sale) => sale.product)
  sales: Relation<Sale>[];
}
