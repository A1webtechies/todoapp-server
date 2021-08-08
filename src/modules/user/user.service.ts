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

  async create(body: any) {
    return this.userRepository.create(body);
  }

  async updatePassword(body: any) {
    await this.userRepository.updateOne(
      { email: body.email },
      { password: body.password, emailVerified: true },
    );
  }

  async readNotification(userId: string, readDate: Date) {
    return await this.userRepository.findByIdAndUpdate(userId, {
      notificationReadDate: readDate,
    });
  }
  async readInvites(userId: string, readDate: Date) {
    return await this.userRepository.findByIdAndUpdate(userId, {
      inviteReadDate: readDate,
    });
  }
  async getTotalUsers() {
    return await this.userRepository.countDocuments({});
  }
}
