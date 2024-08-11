import { CoreEntity } from '@common/entities';
import { Sale } from '@modules/sale/sale.entity';
import { Supplier } from '@modules/supplier/supplier.entity';
import { Column, Entity, Index, ManyToOne, OneToMany, Relation } from 'typeorm';

@Entity()
@Index(['code'], { unique: true })
@Index(['code', 'deletedAt'])
export class Product extends CoreEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  @Index()
  supplier: Relation<Supplier>;

  @OneToMany(() => Sale, (sale) => sale.product)
  sales: Relation<Sale>[];
}
