import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ChatGPTService } from './chatgpt.service';
import { ChatGPTRequestDto, ChatGPTResponseDto } from './dto/chat-gpt.dto';

@Controller('chatgpt')
export class ChatGPTController {
  constructor(private readonly chatGPTService: ChatGPTService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  generateResponse(
    @Body() requestDto: ChatGPTRequestDto,
  ): Promise<ChatGPTResponseDto> {
    return this.chatGPTService.generateResponse(requestDto.prompt);
  }
}
