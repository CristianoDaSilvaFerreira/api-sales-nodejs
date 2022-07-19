import ShowProfileService from '@modules/users/services/Users/Profile/ShowProfileService';
import UpdateProfileService from '@modules/users/services/Users/Profile/UpdateProfileService';
import { Request, Response } from 'express';

export default class ProfileConntroller {
  public async showProfile(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const showUser = new ShowProfileService();

    const user_id = request.user.id;

    const users = await showUser.execute({ user_id });

    return response.json(users);
  }

  public async updateProfile(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;

    const { name, username, email, password, old_password } = request.body;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id,
      name,
      username,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }
}
