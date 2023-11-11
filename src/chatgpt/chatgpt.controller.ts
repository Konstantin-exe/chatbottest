import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ChatGPTService } from './chatgpt.service';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';

@Controller('chatgpt')
export class ChatGPTController {
  constructor(private readonly chatGPTService: ChatGPTService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  generateResponse(@Body('prompt') prompt: string) {
    return this.chatGPTService
      .generateResponse(prompt)
      .pipe(
        map((response: AxiosResponse) => response.data.choices[0].text.trim()),
      );
  }
}
