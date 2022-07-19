import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import User from '../../typeorm/entities/User';
import path from 'path';
import fs from 'fs';
import UsersRepositry from '../../typeorm/repositories/UsersRepository';
import uploodConfig from '@config/upload';

interface IUser {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IUser): Promise<User> {
    const usersRespository = getCustomRepository(UsersRepositry);

    const user = await usersRespository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploodConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRespository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
