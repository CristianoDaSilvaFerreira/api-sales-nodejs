import AppError from '@shared/errors/AppErro';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';  
import { getCustomRepository } from 'typeorm';
import User from '../../typeorm/entities/User';
import UsersRepositry from '../../typeorm/repositories/UsersRepository';

interface IResquest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
class CreateSessionsService {
  public async execute({ email, password }: IResquest): Promise<IResponse> {
    const usersRespository = getCustomRepository(UsersRepositry);

    const user = await usersRespository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect e-mail/password combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect e-mail/password combination', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
