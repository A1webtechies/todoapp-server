import { Connection } from 'mongoose';
import { TODOS, TODO_REPOSITORY } from '../../constants';
import { TodoSchema } from './todo.schema';

export const todoProviders = [
  {
    provide: TODO_REPOSITORY,
    useFactory: (connection: Connection) => connection.model(TODOS, TodoSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
