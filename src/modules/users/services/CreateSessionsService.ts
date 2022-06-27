import AppError from '@shared/errors/AppErro';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepositry from '../typeorm/repositories/UsersRepository';

interface IUser {
  email: string;
  password: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IUser): Promise<User> {
    const usersRespository = getCustomRepository(UsersRepositry);

    const user = await usersRespository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect e-mail/password combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect e-mail/password combination', 401);
    }

    return user;
  }
}

export default CreateSessionsService;
