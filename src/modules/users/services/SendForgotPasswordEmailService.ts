import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import UsersRepositry from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IUserToken {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IUserToken): Promise<void> {
    const usersRespository = getCustomRepository(UsersRepositry);

    const userTokensRepository = await getCustomRepository(
      UserTokensRepository,
    );

    const user = await usersRespository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const token = await userTokensRepository.generate(user.id);

    console.log(token);
  }
}
