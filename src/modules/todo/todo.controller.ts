import {
  Controller,
  Get,
  Logger,
  Req,
  Res,
  HttpStatus,
  Post,
  UseGuards,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { Response } from 'express';
import { JwtAuthGuard } from '../auth';
import { TodoDto } from './todo.dto';

import { TodoService } from './todo.service';

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
  logger = new Logger(TodoController.name);

  constructor(private readonly _s: TodoService) {}

  @Get('')
  async index(@Req() req, @Res() res: Response) {
    const data = await this._s.all({
      createdBy: req.user.userId,
      deletedAt: { $exists: false },
    });
    this._s.response(res, HttpStatus.OK, data, 'Found');
  }
  @Get('/:id')
  async singleItem(@Param() params: { id: string }, @Res() res: Response) {
    const data = await this._s.byId(params.id);
    this._s.response(res, HttpStatus.OK, data, 'Found');
  }
  @Post('')
  async create(@Req() req, @Body() body: TodoDto, @Res() res: Response) {
    const data = await this._s.createModel({
      ...body,
      createdBy: req.user.userId,
    });
    this._s.response(res, HttpStatus.OK, data, 'Item created successfully');
  }
  @Put('/:id')
  async update(
    @Req() req,
    @Param() params: { id: string },
    @Body() body: TodoDto,
    @Res() res: Response,
  ) {
    const data = await this._s.findByIdAndUpdate(params.id, {
      ...body,
    });
    this._s.response(res, HttpStatus.OK, data, 'Item updated successfully');
  }
  @Delete('/:id')
  async delete(
    @Req() req,
    @Param() params: { id: string },
    @Res() res: Response,
  ) {
    const data = await this._s.findByIdAndUpdate(params.id, {
      deletedAt: new Date(),
    });
    this._s.response(res, HttpStatus.OK, data, 'Item deleted successfully');
  }
}
