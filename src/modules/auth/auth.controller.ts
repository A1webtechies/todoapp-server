import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
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
      return res.status(HttpStatus.OK).json({
        message: 'Successfully LoggedIn',
        data: response,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: 'Something went wrong!.' });
    }
  }

  @Post('/register')
  async register(@Body() body: SignupDto, @Res() res: Response) {
    try {
      const user = await this.userService.findByEmail(body.email);

      if (user && user.email) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ status: 'error', message: 'EMAIL Already Registered' });
      }

      await this.userService.createModel({
        ...body,
        password: bcrypt.hashSync(body.password, jwtConstants.salt),
      });

      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Your account has been created',
      });
    } catch (error) {
      this.logger.error(error);

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: 'Something went wrong!.' });
    }
  }
}
