import { Controller, Post, Request } from '@nestjs/common';
import { Request as RequestExpress } from 'express';
import * as Types from './user.type';
import { UserValidate } from './user.validate';
import { UserService } from './user.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly userValidate: UserValidate) { }

  @Post('register')
  @ApiOperation({ summary: 'registerUser', tags: ['User'] })
  async registerUser(@Request() req: RequestExpress) {
    const data: Types.service.registerUserRequest = this.userValidate.registerUser(req);
    const response: Types.service.registerUserResponse = await this.userService.registerUser(data);

    return response;
  }
}
