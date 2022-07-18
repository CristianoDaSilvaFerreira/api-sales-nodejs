import { Request, Response } from 'express';
import CreateUserService from '../services/Users/CreateUserService';
import DeleteUserService from '../services/Users/DeleteUserService';
import ListUserService from '../services/Users/ListUserService';
import ShowUserService from '../services/Users/ShowUserService';
import UpdateUserService from '../services/Users/UpdateUserService';

export default class UsersConntroller {
  public async indexUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listUser = new ListUserService();

    console.log(request.user.id);

    const users = await listUser.execute();

    return response.json(users);
  }

  public async showUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const showUser = new ShowUserService();

    const users = await showUser.execute({ id });

    return response.json(users);
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
