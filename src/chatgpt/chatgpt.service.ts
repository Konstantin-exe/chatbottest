import { Injectable, Logger } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class ChatGPTService {
  private readonly openai: OpenAI;
  private readonly logger = new Logger(ChatGPTService.name);

  constructor() {
    this.openai = new OpenAI({
      organization: 'org-ztnDerKbXUUCGfR79oHzetip',
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateResponse(userMessage: string): Promise<any> {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [
        {
          role: 'system',
          content:
            'You are a medidacl doctor specialized in birth. You are giving overal tips in the pregnancy process',
        },
        { role: 'user', content: userMessage },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.9,
    };

    try {
      const chatCompletion: OpenAI.Chat.ChatCompletion =
        await this.openai.chat.completions.create(params);
      return chatCompletion.choices[0].message;
    } catch (error) {
      this.logger.error(
        `Failed to generate response: ${JSON.stringify(
          error.response?.data || error.message,
        )}`,
      );
      throw new Error('Failed to generate response');
    }
  }
}
