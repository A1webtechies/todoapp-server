export interface IParam {
  id: string;
}

interface IDynamic {
  [key: string]: any;
}

export interface IPaginate<T> extends IDynamic {
  total: number;
  pages: number;
  page: number;
  limit: number;
  search: string;
  docs: Array<T>;
}

export interface IQuery {
  page: string;
  limit: string;
  search: string;
}
