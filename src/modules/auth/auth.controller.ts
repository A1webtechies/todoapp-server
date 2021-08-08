import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from '../user/user.service';
import { SignupDto, SigninDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/constants';
import { AuthGuard } from '@nestjs/passport';
import { env } from 'process';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() signinDto: SigninDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const response = await this.authService.login(req.user);
      return res.json({
        status: 'success',
        message: 'Successfully LoggedIn',
        data: response,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: 'Something went wrong!.' });
    }
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto, @Res() res: Response) {
    try {
      const checkUserWithEmail = await this.userService.findByEmail(
        signupDto.email,
      );

      if (checkUserWithEmail && checkUserWithEmail.email) {
        return res
          .status(409)
          .json({ status: 'error', message: 'EMAIL Already Registered' });
      }

      const createUser = await this.userService.create({
        ...signupDto,
        roles: ['user'],
        emailVerified: false,
        password: bcrypt.hashSync(signupDto.password, jwtConstants.salt),
      });

      return res.status(201).json({
        status: 'success',
        message: 'Please check your inbox to verify email.',
      });
    } catch (error) {
      this.logger.error(error);

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: 'Something went wrong!.' });
    }
  }
}
