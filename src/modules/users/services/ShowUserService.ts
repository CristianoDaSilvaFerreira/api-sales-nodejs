import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepositry from '../typeorm/repositories/UserRepository';

interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
}

class ShowUserService {
  public async execute({ id }: IUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositry);

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
