import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/db/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  async getRecordThisUser() {
    const records = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.records', 'records')
      .getMany();
    return records;
  }
}
