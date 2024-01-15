import { Router } from 'express';
import userRouter from './users';
import cardRouter from './cards';

const routes = Router();

routes.use('./users', userRouter);
routes.use('./cards', cardRouter);

export default routes;
