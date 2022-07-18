import User from '@modules/users/typeorm/entities/User';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';

interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    username,
    email,
    password,
  }: IUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new AppError('User not found!');
    }

    const usernameExists = await usersRepository.findByName(name);

    if (usernameExists && username !== user.username) {
      throw new AppError('There is already a user with this name');
    }   
    
    user.name = name;
    user.username = username;
    user.email = email;
    user.password = password;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
