import { Response, NextFunction } from 'express';
import { UserRequest } from '../userRequest';
import NotFoundError from './notFoundError';
import { ErrorMessage } from '../constants';

export default (req: UserRequest, res: Response, next: NextFunction) => {
  next(new NotFoundError(ErrorMessage.PAGE_NOT_EXIST));
};
