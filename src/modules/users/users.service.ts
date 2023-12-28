import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { Like, UpdateResult } from 'typeorm';
import { QueryInterface } from '../products/interfaces/queryProduct';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}


  async findById(id: any): Promise<User> {
    const response = await this.usersRepository.findById(id);
    return response;
  }
  async createUser(user: any): Promise<User> {
    const response = await this.usersRepository.createUser(user);
    return response;
  }
  async deleteUserById(id: number): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.deleteUserById(user);
  }
  async softDeleteUserById(id: number): Promise<UpdateResult> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.usersRepository.softDeleteUserById(id);
  }
  async getAllSoftDeletedUsers(): Promise<User[]> {
    const response = await this.usersRepository.getAllSoftDeletedUsers();
    return response;
  }
  async updateAvatarUser(id: number, data: any): Promise<UpdateResult> {
    return this.usersRepository.updateAvatarUser(id, data);
  }
  async updateUser(id: number, data: any): Promise<UpdateResult> {
    return this.usersRepository.updateUser(id, data);
  }
  async updateStatusUser(id: number): Promise<UpdateResult> {
    let data = {};
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (user.status === 'activate') {
      data = { status: 'inactive' };
    } else {
      data = { status: 'activate' };
    }
    return this.usersRepository.updateStatusUser(id, data);
  }

  async findAll(
    query: QueryInterface,
  ): Promise<{ data: User[]; totalCount: number }> {
    const queryObject = {};
    if (query.searchKey && query.searchValue) {
      (queryObject as any).where = {
        [query.searchKey]: Like(`%${query.searchValue}%`),
      };
    }
    if (query.sortKey && query.sortValue) {
      (queryObject as any).order = { [query.sortKey]: query.sortValue };
    }
    if (query.page && query.pageSize) {
      (queryObject as any).skip = (query.page - 1) * query.pageSize;
      (queryObject as any).take = query.pageSize;
    }
    return await this.usersRepository.findAll(queryObject);
  }
}
