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

class UpdateUserService {
  public async execute({
    id,
    name,
    username,
    email,
    password,
  }: IUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositry);

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
