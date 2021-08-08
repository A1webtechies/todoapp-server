import {
  Controller,
  Get,
  Logger,
  Req,
  Res,
  HttpStatus,
  Post,
  Param,
  Query,
} from '@nestjs/common';
import { query, Request, Response } from 'express';
import { IParam } from 'src/interface';

import { TodoService } from './todo.service';
import { Types } from 'mongoose';

@Controller('todo')
export class TodoController {
  logger = new Logger(TodoController.name);

  constructor(private readonly _s: TodoService) {}

  @Get('')
  async index(@Req() req: Request, @Res() res: Response) {
    const data = await this._s.all().sort({ order: 1 });
    return res
      .status(HttpStatus.OK)
      .json({ statusCode: HttpStatus.OK, message: 'success', data });
  }

  @Post('')
  async create(@Req() req: Request, @Res() res: Response) {
    const data = await this._s.create();
    return res
      .status(HttpStatus.OK)
      .json({ statusCode: HttpStatus.OK, message: 'success', data });
  }
}
