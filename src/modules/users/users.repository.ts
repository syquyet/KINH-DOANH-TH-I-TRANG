import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Not, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
 

  async findById(id: any): Promise<User> {
    try {
      return this.usersRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw error;
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const newUser = this.usersRepository.create(user);
      return this.usersRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }
  async deleteUserById(user: User): Promise<void> {
    try {
      await this.usersRepository.remove(user);
    } catch (error) {
      throw error;
    }
  }
  async softDeleteUserById(id: number): Promise<UpdateResult> {
    try {
      return this.usersRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async getAllSoftDeletedUsers(): Promise<User[]> {
    try {
      return this.usersRepository.find({ where: { deletedAt: Not(null) } });
    } catch (error) {}
  }
  async updateAvatarUser(id: number, data: any): Promise<UpdateResult> {
    try {
      return this.usersRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  }
  async updateUser(id: number, data: any): Promise<UpdateResult> {
    try {
      return this.usersRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  }
  async updateStatusUser(id: number, data: any): Promise<UpdateResult> {
    try {
      return this.usersRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    queryObject: FindManyOptions<User>,
  ): Promise<{ data: User[]; totalCount: number }> {
    try {
      const [data, totalCount] =
        await this.usersRepository.findAndCount(queryObject);
      return {
        data,
        totalCount,
      };
    } catch (error) {
      throw error;
    }
  }
}
