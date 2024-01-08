import mongoose from 'mongoose';
import express, { NextFunction, Response } from 'express';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import { UserRequest } from './utils/userRequest';
import errorHandler from './utils/errors/errorHandler';
import NotFoundError from './utils/errors/notFoundError';
import { DEFAULT_PORT, MONGO_DB_URL } from './utils/constants';

const app = express();

const { PORT = DEFAULT_PORT } = process.env;

app.use((req: UserRequest, res: Response, next: NextFunction) => {
  req.user = { _id: '659a6b45373b045118e16f1e' };
  next();
});

app.use(express.json());
app.use(userRouter);
app.use(cardRouter);

app.use((req: UserRequest, res: Response, next: NextFunction) => {
  next(new NotFoundError('Страницы не существует'));
});

app.use(errorHandler);

const connect = async () => {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(MONGO_DB_URL);
    console.log('Подключились к базе');

    await app.listen(PORT);
    console.log(`Сервер запущен на порту: ${PORT}`);
  } catch (error) {
    console.log(`На сервере произошла ошибка ${error}`);
  }
};

connect();
