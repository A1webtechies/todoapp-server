import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TODO_REPOSITORY } from 'src/constants';
import { BaseService } from '../shared/base.service';
import { ITodo } from './todo.schema';

@Injectable()
export class TodoService extends BaseService {
  constructor(
    @Inject(TODO_REPOSITORY)
    public repo: Model<ITodo>,
  ) {
    super(repo);
  }

  create = async () => {
    const data = await this.repo.create([
      {
        title: 'Development',
        cover: '',
      },
      {
        title: 'Designing',
        cover: '',
      },
      {
        title: 'Artificial Intelligence',
        cover: '',
      },
    ]);
    return data;
  };
}
