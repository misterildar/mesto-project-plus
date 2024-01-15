import { celebrate, Joi } from 'celebrate';
import { urlRegex } from '../utils/constants';

export const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(urlRegex),
  }),
});

export const deleteCardByIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});
