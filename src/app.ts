import mongoose from 'mongoose';
import express from 'express';
import { errors } from 'celebrate';
import auth from './middlewares/auth';
import errorHandler from './utils/errors/errorHandler';
import pageNotExist from './utils/errors/page-not-exist';
import { login, createUser } from './controllers/users';
import { requestLogger, errorLogger } from './middlewares/logger';
import { DEFAULT_PORT, MONGO_DB_URL } from './utils/constants';
import {
  createUserValidation,
  loginValidation,
} from './middlewares/validation-user';
import limiter from './utils/rate-limit';
import routes from './routes/index';

const app = express();

app.use(limiter);

const { PORT = DEFAULT_PORT } = process.env;

app.use(express.json());

app.use(requestLogger);

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use(routes);

app.use(pageNotExist);

app.use(errorLogger);

app.use(errors());

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
