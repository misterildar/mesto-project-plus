import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUsersMe,
} from '../controllers/users';
import {
  getUserByIdValidation,
  updateUserValidation,
  updateAvatarValidation,
} from '../middlewares/validation-user';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getUsersMe);
userRouter.get('/:userId', getUserByIdValidation, getUserById);
userRouter.patch('/me', updateUserValidation, updateUser);
userRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);

export default userRouter;
