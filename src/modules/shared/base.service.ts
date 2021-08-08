import { HttpCode, Injectable, Logger } from '@nestjs/common';

import { FilterQuery, Model } from 'mongoose';
import { Response } from 'express';

export class BaseService {
  private logger = new Logger(BaseService.name);
  repository: Model<any>;
  constructor(repository: Model<any>) {
    this.repository = repository;
  }

  createModel = async <T>(data: any) => await this.repository.create(data);

  createMany = async <T>(data: any) => await this.repository.insertMany(data);

  /**
   * Find All
   * @returns Object
   */
  all = (condition?: FilterQuery<any>) => this.repository.find(condition);

  /**
   * Find All
   * @returns Object
   */
  one = (condition?: FilterQuery<any>) => this.repository.findOne(condition);

  /**
   * Paginated Data
   * @param condition Paginated
   * @returns Paginations
   */
  paginate = (condition?: FilterQuery<any>, paginate?: {}) =>
    this.repository.find(condition, {}, paginate);

  /**
   * Count
   * @returns Object
   */
  countDocuments = (condition?: {}) =>
    this.repository.countDocuments(condition);

  /**
   * Find By ID
   * @param id Object ID
   * @returns Object
   */
  byId = (id: string) => this.repository.findById(id);

  /**
   * Find By ID
   * @param id Object ID
   * @returns Object
   */
  deleteById = (id: string) => this.repository.findByIdAndDelete(id);

  /**
   * Update Object
   * @param id Object ID
   * @param data Queries to update
   * @returns New Object ID
   */
  findByIdAndUpdate = async <T>(id: string, data: any): Promise<T> =>
    await this.repository.findByIdAndUpdate(id, data, { new: true });

  find = (data: any) => this.repository.findOne(data);

  findOneAndUpdate = (filter: any, data: any) =>
    this.repository.findOneAndUpdate(filter, data, {
      new: true,
      upsert: true,
    });

  //------------------------------ Responses -------------------------- //

  response = (
    res: Response,
    status: number,
    data: any,
    message: string,
    options = {},
  ): Response<any> => {
    return res
      .status(status)
      .json({ statusCode: status, data, message, ...options });
  };

  regex = (v: string) => ({ $regex: v, $options: 'i' });
}
