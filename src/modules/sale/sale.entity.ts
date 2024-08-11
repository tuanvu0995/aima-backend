import { CoreEntity } from '@common/entities';
import { Product } from '@modules/product/product.entity';
import { Column, Entity, Index, ManyToOne, Relation } from 'typeorm';

@Entity('sales')
export class Sale extends CoreEntity {
  @ManyToOne(() => Product, (product) => product.sales)
  @Index()
  product: Relation<Product>;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
