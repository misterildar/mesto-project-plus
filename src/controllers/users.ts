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
    return res.send(users);
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
    if (!user) {
      throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
    } else {
      res.send(user);
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
    res.status(StatusCodes.CREATED).send(newUser);
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
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: ErrorMessage.USER_NOT_FOUND });
    } else {
      const { name, about } = data;
      const updateDataUser = await User.findByIdAndUpdate(
        req.params.userId,
        { name, about },
        { new: true, runValidators: true }
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
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: ErrorMessage.USER_NOT_FOUND });
    } else {
      const updateAvatarUser = await User.findByIdAndUpdate(
        req.params.userId,
        { avatar },
        { new: true, runValidators: true }
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
