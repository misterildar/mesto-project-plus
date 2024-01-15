import { model, Schema } from 'mongoose';
import isURL from 'validator/lib/isURL';
import { ErrorMessage } from '../utils/constants';

interface Card {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const userSchema = new Schema<Card>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url: string) => isURL(url),
      message: ErrorMessage.INVALID_URL,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<Card>('Card', userSchema);
