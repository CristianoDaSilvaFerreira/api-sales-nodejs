import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import UsersRepositry from '../../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IUserToken {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IUserToken): Promise<void> {
    const usersRespository = getCustomRepository(UsersRepositry);

    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRespository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const token = await userTokensRepository.generate(user.id);

    // console.log(token);

    await EtherealMail.sendMail({
      to: email,
      body: `Solicatação de redefinição de seha recebida: ${token?.token}`,
    });
  }
}
