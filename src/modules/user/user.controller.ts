import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { Response } from 'express';

import { IPaginate, IQuery } from 'src/interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IUserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController extends UserService {
  /**
   * My Profile
   * @param req Request Body
   */
  @Get('me')
  async getProfile(@Req() req, @Res() res: Response) {
    const user = await this.byId(req.user.userId).populate('interests');
    return res.json({
      status: 'success',
      message: 'Found!',
      data: user.toObject(),
    });
  }

  /**
   * My Profile
   * @param req Request Body
   */
  @Get('/:id')
  async userProfile(
    @Req() req,
    @Param() param: { id: string },
    @Res() res: Response,
  ) {
    const user = await this.byId(param.id).populate('interests');
    return res.json({
      status: 'success',
      message: 'Found!',
      data: user.toObject(),
    });
  }
}
