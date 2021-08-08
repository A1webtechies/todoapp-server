import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [TodoService],
  controllers: [TodoController],
  exports: [TodoService],
})
export class TodoModule {}
