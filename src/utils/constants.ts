export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  ERROR_SERVER: 500,
};

export const ErrorMessage = {
  INCORRECT_DATA_CREATION_CARD:
    'Переданы некорректные данные при создании карточки',
  INCORRECT_DATA: 'Переданы некорректные данные',
  CARD_NOT_FOUND: 'Карточка с указанным _id не найдена',
  INCORRECT_DATA_CREATION_USER:
    'Переданы некорректные данные при создании пользователя',
  USER_NOT_FOUND: 'Пользователь по указанному _id не найден',
  SERVER_ERROR: 'На сервере произошла ошибка',
};

export const DEFAULT_PORT = 3000;

export const MONGO_DB_URL = 'mongodb://localhost:27017/mestodb';
