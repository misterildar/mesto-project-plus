import { Error } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import NotFoundError from '../utils/errors/notFoundError';
import { StatusCodes, ErrorMessage } from '../utils/constants';
import BadRequestError from '../utils/errors/badRequestError';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    return res.status(StatusCodes.OK).send(users);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!userId) {
      throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
    } else {
      res.status(StatusCodes.OK).send(user);
    }
  } catch (error) {
    if (error instanceof Error.CastError) {
      next(new BadRequestError(ErrorMessage.INCORRECT_DATA));
    } else {
      next(error);
    }
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await User.create(req.body);
    if (!newUser) {
      throw new NotFoundError(ErrorMessage.INCORRECT_DATA_CREATION_USER);
    } else {
      res.status(StatusCodes.CREATED).send(newUser);
    }
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      next(new BadRequestError(ErrorMessage.INCORRECT_DATA));
    } else {
      next(error);
    }
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    if (!data) {
      throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
    } else {
      const { name, about } = data;
      const updateDataUser = await User.findByIdAndUpdate(
        req.params.userId,
        { name, about },
        { new: true }
      );
      res.status(StatusCodes.OK).send(updateDataUser);
    }
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      next(new BadRequestError(ErrorMessage.INCORRECT_DATA));
    } else {
      next(error);
    }
  }
};

export const updateAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { avatar } = req.body;
    if (!avatar) {
      throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
    } else {
      const updateAvatarUser = await User.findByIdAndUpdate(
        req.params.userId,
        { avatar },
        { name: true }
      );
      res.status(StatusCodes.OK).send(updateAvatarUser);
    }
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      next(new BadRequestError(ErrorMessage.INCORRECT_DATA));
    } else {
      next(error);
    }
  }
};
