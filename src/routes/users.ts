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

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getUsersMe);
userRouter.get('/users/:userId', getUserByIdValidation, getUserById);
userRouter.patch('/users/me', updateUserValidation, updateUser);
userRouter.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

export default userRouter;
