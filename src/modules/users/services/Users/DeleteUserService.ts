import User from '@modules/users/typeorm/entities/User';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';

interface IUser {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IUser): Promise<User> {
    const usersRepositry = getCustomRepository(UsersRepository);

    const user = await usersRepositry.findOne(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    await usersRepositry.remove(user);

    return user;
  }
}

export default DeleteUserService;
