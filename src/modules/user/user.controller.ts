import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Response } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
    const user = await this.byId(req.user.userId);
    this.response(res, HttpStatus.OK, user, 'Found');
  }
}
