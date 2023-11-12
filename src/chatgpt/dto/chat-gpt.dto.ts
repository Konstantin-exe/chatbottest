import { ApiProperty } from '@nestjs/swagger';

export class ChatGPTRequestDto {
  @ApiProperty()
  prompt: string;
}

export class ChatGPTResponseDto {
  @ApiProperty()
  message: {
    role: string;
    content: string;
  };
}
