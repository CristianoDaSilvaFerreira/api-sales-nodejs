import { Request, Response } from 'express';
import ResetPasswordService from '../services/Password/ResetPasswordService';

export default class ResetPasswordController {
  public async createUser(
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
