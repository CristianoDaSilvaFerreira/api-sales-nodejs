import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
export default class CustomersRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.findOne({ where: { name: name } });

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.findOne({ where: { id: id } });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.findOne({ where: { email: email } });

    return customer;
  }
}
