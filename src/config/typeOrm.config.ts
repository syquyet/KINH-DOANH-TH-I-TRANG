import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Cart } from 'src/modules/carts/entities/cart.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { OrderDetail } from 'src/modules/order_detail/entities/order_detail.entity';
import { Order } from 'src/modules/orders/entities/orders.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';

config();
const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'quyetvosy123',
  database: 'project_nestjs',
  entities: [User, Product, Category,Cart,Order,OrderDetail],
  synchronize: true,
};
export default typeOrmConfig;
