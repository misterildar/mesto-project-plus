import { ErrorRequestHandler } from 'express';
import { StatusCodes, ErrorMessage } from '../constants';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode = StatusCodes.ERROR_SERVER, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === StatusCodes.ERROR_SERVER
        ? ErrorMessage.SERVER_ERROR
        : message,
  });
  next();
};

export default errorHandler;
