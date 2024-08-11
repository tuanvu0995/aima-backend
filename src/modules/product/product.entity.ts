import { CoreEntity } from '@common/entities';
import { Supplier } from '@modules/supplier/supplier.entity';
import { Column, Entity, Index, ManyToOne, Relation } from 'typeorm';

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
}
