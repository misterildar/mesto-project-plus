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

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCardValidation, createCard);
cardRouter.delete('/cards/:cardId', deleteCardByIdValidation, deleteCardById);
cardRouter.put('/cards/:cardId/likes', likesCard);
cardRouter.delete('/cards/:cardId/likes', deleteLikesCard);

export default cardRouter;
