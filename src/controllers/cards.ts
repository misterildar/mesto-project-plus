import { Error } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import { UserRequest } from '../utils/userRequest';
import NotFoundError from '../utils/errors/notFoundError';
import ForbiddenError from '../utils/errors/forbiddenError';
import BadRequestError from '../utils/errors/badRequestError';
import { StatusCodes, ErrorMessage } from '../utils/constants';

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (error) {
    return next(error);
  }
};

export const createCard = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const owner = req.user?._id;
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link, owner });
    res.status(StatusCodes.CREATED).send(newCard);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      next(new BadRequestError(ErrorMessage.INCORRECT_DATA));
    } else {
      next(error);
    }
  }
};

export const deleteCardById = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) {
      throw new NotFoundError(ErrorMessage.CARD_NOT_FOUND);
    }
    if (card?.owner.toString() !== req.user?._id) {
      next(new ForbiddenError(ErrorMessage.FORBIDDEN));
    }
    const deleteCard = await Card.findByIdAndRemove(cardId);
    if (!deleteCard) {
      throw new NotFoundError(ErrorMessage.CARD_NOT_FOUND);
    } else {
      await card?.deleteOne();
      res.status(StatusCodes.OK).send(deleteCard);
    }
  } catch (error) {
    if (error instanceof Error.CastError) {
      next(new BadRequestError(ErrorMessage.INCORRECT_DATA));
    } else {
      next(error);
    }
  }
};

export const likesCard = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const likes = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user?._id } },
      { new: true }
    );
    if (!likes) {
      throw new NotFoundError(ErrorMessage.CARD_NOT_FOUND);
    } else {
      res.status(StatusCodes.OK).send(likes);
    }
  } catch (error) {
    if (error instanceof Error.CastError) {
      next(new BadRequestError(ErrorMessage.INCORRECT_DATA));
    } else {
      next(error);
    }
  }
};

export const deleteLikesCard = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const removeLikes = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user?._id } },
      { new: true }
    );
    if (!removeLikes) {
      throw new NotFoundError(ErrorMessage.CARD_NOT_FOUND);
    } else {
      res.status(StatusCodes.OK).send(removeLikes);
    }
  } catch (error) {
    if (error instanceof Error.CastError) {
      next(new BadRequestError(ErrorMessage.INCORRECT_DATA));
    } else {
      next(error);
    }
  }
};
