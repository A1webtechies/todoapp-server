import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

import { Document } from 'mongoose';

export interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;

  password: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    displayName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    deletedAt: Date,
  },
  { timestamps: true },
);

export { UserSchema };
