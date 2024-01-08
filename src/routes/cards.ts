import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCardById,
  likesCard,
  deleteLikesCard,
} from '../controllers/cards';

const cardRouter = Router();

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', deleteCardById);
cardRouter.put('/cards/:cardId/likes', likesCard);
cardRouter.delete('/cards/:cardId/likes', deleteLikesCard);

export default cardRouter;
