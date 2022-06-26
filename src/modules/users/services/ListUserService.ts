
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepositry from '../typeorm/repositories/UserRepository';


class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepositry);
  
    const users = await usersRepository.find();

    return users;
  }
}

export default ListUserService;
