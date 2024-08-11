import { CoreEntity } from '@common/entities';
import { Product } from '@modules/product/product.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

@Entity()
export class Supplier extends CoreEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  address: string;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Relation<Product>[];
}
