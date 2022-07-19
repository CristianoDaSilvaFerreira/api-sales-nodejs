import Customer from '@modules/customers/typeorm/entities/Customer';
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

interface IProoduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IOrder {
  customer: Customer;
  products: IProoduct[];
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne({
      where: { id: id },
      relations: ['order_products', 'customers'],
    });

    return order;
  }

  public async createOrder({ customer, products }: IOrder): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}
