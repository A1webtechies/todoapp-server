import * as mongoose from 'mongoose';

import { Document } from 'mongoose';
import { USERS } from 'src/constants';

export interface ITodo extends Document {
  createdBy: string;
  title: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const TodoSchema = new mongoose.Schema<ITodo>(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: USERS,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },

    deletedAt: Date,
  },
  { timestamps: true },
);

export { TodoSchema };
