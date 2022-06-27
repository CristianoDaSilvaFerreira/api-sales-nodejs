import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersConntroller {
  public async indexUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listUser = new ListUserService();

    const users = listUser.execute();

    return response.json(users);
  }

  public async showUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowUserService();

    const products = await showProduct.execute({ id });

    return response.json(products);
  }

  public async createUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, username, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      username,
      email,
      password,
    });

    return response.json(user);
  }

  public async updateUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const { name, username, email, password } = request.body;

    const updateProduct = new UpdateUserService();

    const product = await updateProduct.execute({
      id,
      name,
      username,
      email,
      password,
    });

    return response.json(product);
  }

  public async deleteUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteUser = new DeleteUserService();

    const user = await deleteUser.execute({ id });

    return response.json(user);
  }
}
