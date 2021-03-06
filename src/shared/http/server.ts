import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppErro';
import '@shared/typeorm';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

// Middleware que irรก captura os erros
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    // Verficando se o erro รฉ uma instancia da class AppError
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        stattus: 'error',
        message: error.message,
      });
    }

    // Quando o erro nรฃo for uma instancia da class AppError
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(3000, () => {
  console.log('Server started on port 3000! ๐ ๐๐๐');
});
