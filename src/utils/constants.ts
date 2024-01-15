export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  AUTH_ERROR: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  CONFLICT_ERROR: 409,
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
  FORBIDDEN: 'У вас нет возможности удалять карточки других пользователей.',
  AUTORIZATION_REQUIRED: 'Необходима авторизация',
  INVALID_URL: 'Неверная ссылка',
  INVALID_EMAIL: 'Неверный email',
  INVALID_EMAIL_PASSWORD: 'Неправильные почта или пароль',
  PAGE_NOT_EXIST: 'Страницы не существует',
  ALREADY_EXIST: 'Пользователь с таким email уже зарегистрирован',
};

export const DEFAULT_PORT = 3000;

export const MONGO_DB_URL = 'mongodb://localhost:27017/mestodb';

// export const MONGO_DB_URL = 'mongodb://0.0.0.0:27017/.';

// export const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/.';

export const urlRegex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const DEFAULT_NAME = 'Жак-Ив Кусто';

export const DEFAULT_ABOUT = 'Исследователь';

export const DEFAULT_URL_AVATAR =
  'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

export const CONFLICT = 11000;
