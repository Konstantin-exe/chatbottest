import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ChatGPTService } from './chatgpt.service';

@Controller('chatgpt')
export class ChatGPTController {
  constructor(private readonly chatGPTService: ChatGPTService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  generateResponse(@Body('prompt') prompt: string) {
    return this.chatGPTService.generateResponse(prompt);
  }
}
