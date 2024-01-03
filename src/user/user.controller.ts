import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':userId')
  findById(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<User | undefined> {
    return this.userService.findById(userId);
  }

  @Post()
  create(@Body() user: Partial<User>): Promise<number | undefined> {
    return this.userService.create(user);
  }
}
