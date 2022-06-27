import CreateSessionsService from '@modules/users/services/AuthSessions/CreateSessionsService';
import { Request, Response } from 'express';

export default class SessionsController {
  public async createSession(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionsService();

    const user = await createSession.execute({
      email,
      password,
    });

    return response.json(user);
  }
}
