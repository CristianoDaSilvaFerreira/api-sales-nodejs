import ResetPasswordService from '@modules/users/services/Password/ResetPasswordService';
import { Request, Response } from 'express';

export default class ResetPasswordController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token, password } = request.body;

    const passwordEmail = new ResetPasswordService();

    await passwordEmail.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}
