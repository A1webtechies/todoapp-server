import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';

import { DatabaseModule } from './modules/database/database.module';

import { TodoModule } from './modules/todo/todo.module';

import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, TodoModule, DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
