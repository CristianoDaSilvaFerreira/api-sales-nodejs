import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
class Product {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn({ name: 'created' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated' })
  updated_at: Date;
}

export default Product;
