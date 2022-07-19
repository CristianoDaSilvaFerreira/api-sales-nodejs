import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRespository';

interface ICustomer {
  name: string;
  email: string;
  phone: string;
}

export default class CreateCustomerService {
  public async execute({ name, email, phone }: ICustomer): Promise<Customer> {
    const customersRespository = getCustomRepository(CustomersRepository);

    const emailExists = await customersRespository.findByEmail(email);

    if (emailExists) {
      throw new AppError('E-mail address already used');
    }  

    const customer = customersRespository.create({
      name,
      email,
      phone,
    });

    await customersRespository.save(customer);

    return customer;
  }
}
