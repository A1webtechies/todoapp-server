import { IQuery } from 'src/interface';

export const makeQuery = (q: IQuery) => {
  const limit = parseInt(q.limit) || 10;
  const page = parseInt(q.page) || 1;
  return {
    limit: limit,
    skip: (page - 1) * limit,
    page: page,
    search: q.search || '',
  };
};

export * from './validation-formatter.helper';
