import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async findById(id: number): Promise<Message | undefined> {
    const message = await this.messageRepository.findOne(
      id as FindOneOptions<Message>,
    );

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }

  async create(userId: number, message: Message): Promise<Message> {
    // const user = await this.findById(userId);
    // userId as param:
    const newMessage = this.messageRepository.create(message);
    return this.messageRepository.save(newMessage);
  }
}
