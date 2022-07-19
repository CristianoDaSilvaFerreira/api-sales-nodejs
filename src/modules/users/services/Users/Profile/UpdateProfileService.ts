import User from '@modules/users/typeorm/entities/User';
import { compare, hash } from 'bcryptjs';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';

interface IUser {
  user_id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  old_password?: string;
}

export default class UpdateProfileService {
  public async execute({
    user_id,
    name,
    username,
    email,
    password,
    old_password,
  }: IUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userupdateEmail = await usersRepository.findByEmail(email);

    if (userupdateEmail && userupdateEmail.id !== user_id) {
      throw new AppError('There is already one user with this email.');
    }

    const usernameUpdate = await usersRepository.findByUsername(username);

    if (usernameUpdate && usernameUpdate.id !== user_id) {
      throw new AppError('There is already one user with this username.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.')
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.username = username;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}
