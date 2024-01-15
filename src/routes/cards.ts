import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCardById,
  likesCard,
  deleteLikesCard,
} from '../controllers/cards';
import {
  createCardValidation,
  deleteCardByIdValidation,
} from '../middlewares/validation-card';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', createCardValidation, createCard);
cardRouter.delete('/:cardId', deleteCardByIdValidation, deleteCardById);
cardRouter.put('/:cardId/likes', likesCard);
cardRouter.delete('/:cardId/likes', deleteLikesCard);

export default cardRouter;
