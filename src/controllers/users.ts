import { Error } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { UserRequest } from '../utils/userRequest';
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
    const { name, about, avatar, email, password } = req.body;
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashPassword,
    });
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
  req: UserRequest,
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
        req.user?._id,
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
  req: UserRequest,
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
        req.user?._id,
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

export const login = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
      expiresIn: '7d',
    });
    res.cookie('token', token, {
      httpOnly: true,
    });
    res.send({ message: 'Всё верно!' });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      next(new BadRequestError(ErrorMessage.INCORRECT_DATA));
    } else {
      next(error);
    }
  }
};

export const getUsersMe = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?._id);
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
