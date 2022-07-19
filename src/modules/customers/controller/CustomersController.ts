import { Request, Response } from 'express';
import CreateCustomerService from '../service/CreateCustomerService';
import DeleteCustomerService from '../service/DeleteCustomerService';
import ListCustomerService from '../service/ListCustomerService';
import ShowCustomerService from '../service/ShowCustomerService';
import UpdateCustomerService from '../service/UpdatedCustomerService';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomer = new ListCustomerService();

    const customer = await listCustomer.execute();

    return response.json(customer);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute({ id });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone } = request.body;

    const createCustomer = new CreateCustomerService();

    const customer = await createCustomer.execute({
      name,
      email,
      phone,
    });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, email, phone } = request.body;

    const updateCustomer= new UpdateCustomerService();

    const customer = await updateCustomer.execute({
      id,
      name,
      email,
      phone,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerService();

    const customer = await deleteCustomer.execute({ id });

    return response.json(customer);
  }
}
