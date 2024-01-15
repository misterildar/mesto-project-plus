import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import isURL from 'validator/lib/isURL';
import isEmail from 'validator/lib/isEmail';
import AuthError from '../utils/errors/authError';
import {
  DEFAULT_URL_AVATAR,
  DEFAULT_NAME,
  DEFAULT_ABOUT,
  ErrorMessage,
} from '../utils/constants';

interface User {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<User> {
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<mongoose.Document<unknown, any, User>>;
}

const userSchema = new mongoose.Schema<User, UserModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_NAME,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: DEFAULT_ABOUT,
  },
  avatar: {
    type: String,
    default: DEFAULT_URL_AVATAR,
    validate: {
      validator: (url: string) => isURL(url),
      message: ErrorMessage.INVALID_URL,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (email: string) => isEmail(email),
      message: ErrorMessage.INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
});

userSchema.static(
  'findUserByCredentials',
  async function findUserByCredentials(email: string, password: string) {
    const user: User | null = await this.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthError(ErrorMessage.INVALID_EMAIL_PASSWORD);
    }
    const matched = await bcryptjs.compare(password, user.password);
    if (!matched) {
      throw new AuthError(ErrorMessage.INVALID_EMAIL_PASSWORD);
    }
    return user;
  }
);

export default mongoose.model<User, UserModel>('user', userSchema);
