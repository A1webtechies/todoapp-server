import { Module } from '@nestjs/common';

import { databaseProviders } from './database.provider';
import { todoProviders } from '../todo/todos.provider';

import { usersProviders } from '../user/users.provider';

const props = [...databaseProviders, ...usersProviders, ...todoProviders];

@Module({
  providers: props,
  exports: props,
})
export class DatabaseModule {}
