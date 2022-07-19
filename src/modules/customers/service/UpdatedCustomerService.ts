import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRespository';

interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
    phone,
  }: ICustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findOne({
      where: { id: id },
    });

    if (!customer) {
      throw new AppError('Customer not found!');
    }

    const customerExists = await customersRepository.findByEmail(email);

    if (!customerExists && customer.email) {
      throw new AppError('There is already one customer with this email.')
    }

    customer.name = name;
    customer.email = email;
    customer.phone = phone;

    await customersRepository.save(customer);

    return customer;
  }
}
