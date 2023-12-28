import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    try {
      return this.usersRepository.findOne({ where: { email: email } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createUser(user: { [key: string]: any }): Promise<User> {
    try {
      const newUser = this.usersRepository.create(user);
      return this.usersRepository.save(newUser);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async fetchUser(user_id: number): Promise<User> {
    try {
      return this.usersRepository.findOne({ where: { id: user_id } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
