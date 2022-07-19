import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import path from 'path';
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

    const { token } = await userTokensRepository.generate(user.id);

    // console.log(token);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}
