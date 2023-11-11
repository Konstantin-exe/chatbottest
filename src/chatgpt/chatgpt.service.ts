import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ChatGPTService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
  }

  generateResponse(prompt: string): Observable<AxiosResponse> {
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      prompt: prompt,

      temperature: 1,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    return this.httpService.post(this.apiUrl, data, { headers }).pipe(
      catchError((error: AxiosError) => {
        console.error('Axios error:', error.response?.data || error.message);
        throw new Error('Failed to generate response');
      }),
    );
  }
}
