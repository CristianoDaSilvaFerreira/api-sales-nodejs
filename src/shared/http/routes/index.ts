import productsRouter from '@modules/products/routes/product.routes';
import sessionsRouter from '@modules/users/routes/authSessionsRoutes/sessions.router';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter)

export default routes;
