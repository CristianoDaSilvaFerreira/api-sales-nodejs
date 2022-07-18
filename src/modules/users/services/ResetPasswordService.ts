import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import UsersRepositry from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IUserResetPassword {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IUserResetPassword): Promise<void> {
    const usersRespository = getCustomRepository(UsersRepositry);

    const userTokensRepository = await getCustomRepository(
      UserTokensRepository,
    );

    const userToken = await userTokensRepository.findByToken(token);

    // Validação do token do usuário
    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await usersRespository.findById(userToken.user_id);

    // Validação do usuário se existe
    if (!user) {
      throw new AppError('User does not exists');
    }

    // Validação da data e hora da criação do token do usuário
    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired,');
    }

    user.password = await hash(password, 8);
  }
}
