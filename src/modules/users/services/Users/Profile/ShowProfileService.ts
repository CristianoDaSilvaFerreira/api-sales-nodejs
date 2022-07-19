import User from '@modules/users/typeorm/entities/User';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';

interface IUser {
  user_id: string;
}

export default class ShowProfileService {
  public async execute({ user_id }: IUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found')
    }

    return user;
  }
}
