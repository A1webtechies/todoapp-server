import { Module, forwardRef } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
