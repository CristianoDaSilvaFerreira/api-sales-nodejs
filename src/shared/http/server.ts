import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppErro';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

// Middleware que irá captura os erros
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    // Verficando se o erro é uma instancia da class AppError
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        stattus: 'error',
        message: error.message,
      });
    }

    // Quando o erro não for uma instancia da class AppError
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333! 🏆 🚀🚀🚀');
});
