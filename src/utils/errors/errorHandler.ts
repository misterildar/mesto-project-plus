import { ErrorRequestHandler } from 'express';
import { StatusCodes, ErrorMessage } from '../constants';

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  const { statusCode = StatusCodes.ERROR_SERVER, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === StatusCodes.ERROR_SERVER
        ? ErrorMessage.SERVER_ERROR
        : message,
  });
};

export default errorHandler;
