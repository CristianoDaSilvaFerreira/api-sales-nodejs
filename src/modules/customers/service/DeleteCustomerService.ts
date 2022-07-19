import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRespository';

interface ICustomer {
  id: string;
}

export default class DeleteCustomerService {
  public async execute({ id }: ICustomer): Promise<Customer> {
    const customersRepositry = getCustomRepository(CustomersRepository);

    const customer = await customersRepositry.findOne(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await customersRepositry.remove(customer);

    return customer;
  }
}


