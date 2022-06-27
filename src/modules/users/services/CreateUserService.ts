import AppError from '@shared/errors/AppErro';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepositry from '../typeorm/repositories/UsersRepository';

interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    username,
    email,
    password,
  }: IUser): Promise<User> {
    const usersRespository = getCustomRepository(UsersRepositry);

    const usernameExists = await usersRespository.findByUsername(username);

    if (usernameExists) {
      throw new AppError(`User ${username} already exists`);
    }

    const emailExists = await usersRespository.findByEmail(email);

    if (emailExists) {
      throw new AppError('E-mail address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRespository.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await usersRespository.save(user);

    return user;
  }
}

export default CreateUserService;
