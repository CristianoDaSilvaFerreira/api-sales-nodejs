import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepositry from '../typeorm/repositories/UserRepository';

interface IUser {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IUser): Promise<User> {
    const usersRepositry = getCustomRepository(UsersRepositry);

    const user = await usersRepositry.findOne(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    await usersRepositry.remove(user);

    return user;
  }
}

export default DeleteUserService;