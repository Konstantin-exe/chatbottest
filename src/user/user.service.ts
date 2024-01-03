import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(userId: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne(
      userId as FindOneOptions<User>,
    );

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  async create(user: Partial<User>): Promise<number | undefined> {
    // Save the new user to the database
    await this.userRepository.save(user);

    // Return the userId of the created user
    return user.userId;
  }
}
