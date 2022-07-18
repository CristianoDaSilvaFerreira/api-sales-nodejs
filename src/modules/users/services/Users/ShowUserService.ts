import User from '@modules/users/typeorm/entities/User';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';

interface IUser {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new AppError('User not found!');
    }

    return user;
  }
}

export default ShowUserService;
