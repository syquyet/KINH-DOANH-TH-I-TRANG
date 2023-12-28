import { Cart } from 'src/modules/carts/entities/cart.entity';
import { OrderDetail } from 'src/modules/order_detail/entities/order_detail.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  product_name: string;

  @Column({ nullable: false })
  product_price: number;
  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  size: string;

  @Column({ nullable: false })
  product_img: string;

  @Column({ nullable: false })
  category_name: string;

  @Column({ length: 200, nullable: false })
  describe: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @OneToMany(() => Cart, (cart) => cart.product, { onDelete: 'CASCADE' })
  cart: Cart[];
  @OneToMany(() => OrderDetail, (order_detail) => order_detail.product, {
    onDelete: 'CASCADE',
  })
  order_detail: OrderDetail[];
}
