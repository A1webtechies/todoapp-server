import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { USER_REPOSITORY } from 'src/constants';
import { IUserDocument } from './user.schema';
import { BaseService } from '../shared/base.service';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Model<IUserDocument>,
  ) {
    super(userRepository);
  }

  async findOneByEmailOrUsername(
    identifier: string,
  ): Promise<IUserDocument | undefined> {
    return this.userRepository.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
  }

  async findByEmail(email: string): Promise<IUserDocument | undefined> {
    return this.userRepository.findOne({ email: email });
  }

  // async byId(id: string): Promise<IUserDocument | undefined> {
  //   return this.userRepository.findById(id);
  // }

  async findByUsername(username: string): Promise<IUserDocument | undefined> {
    return this.userRepository.findOne({ username: username });
  }
}
