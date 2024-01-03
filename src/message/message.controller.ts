// message.controller.ts

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from 'src/entities/message.entity';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Message | undefined> {
    return this.messageService.findById(id);
  }

  @Post(':userId')
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() message: Message,
  ): Promise<Message> {
    return this.messageService.create(userId, message);
  }
}
