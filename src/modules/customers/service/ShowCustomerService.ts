import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRespository';

interface ICustomer {
  id: string;
}

export default class ShowCustomerService {
  public async execute({ id }: ICustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findOne({
      where: { id: id },
    });
    

    if (!customer) {
      throw new AppError('Customer not found!');
    }

    return customer;
  }
}


