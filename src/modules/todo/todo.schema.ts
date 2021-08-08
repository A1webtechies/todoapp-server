import * as mongoose from 'mongoose';

import { Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const TodoSchema = new mongoose.Schema<ITodo>(
  {
    title: {
      type: String,
    },
    cover: {
      type: String,
    },
    order: {
      type: Number,
    },
    deletedAt: Date,
  },
  { timestamps: true },
);

export { TodoSchema };
