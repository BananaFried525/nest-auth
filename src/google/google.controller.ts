import { Controller, Get, Post, Request } from '@nestjs/common';
import { GoogleService } from './google.service';
import * as Types from './google.type';
import { Request as RequestExpress } from 'express';
import { GoogleValidate } from './google.validate';
import { ApiHeader, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('google')
export class GoogleController {
  constructor(
    private readonly googleService: GoogleService,
    private readonly googleValidate: GoogleValidate,
  ) {}

  @Post('token')
  @ApiOperation({ summary: 'Get anonymous token', tags: ['Anonymous'] })
  async getToken(
    @Request() req: RequestExpress,
  ): Promise<Types.GetTokenResponse> {
    const data: Types.GetTokenRequest = this.googleValidate.getToken(req);
    const response: Types.GetTokenResponse = await this.googleService.getToken(
      data,
    );
    return response;
  }

  @Post('sign/url')
  @ApiOperation({ summary: 'Get google sign in url', tags: ['Google'] })
  @ApiHeader({
    name: 'Authorization',
    description: 'token from getToken',
    required: true,
  })
  async getSignUrl(
    @Request() req: RequestExpress,
  ): Promise<Types.GetSignUrlResponse> {
    const data: Types.GetSignUrlRequest = this.googleValidate.getSignUrl(req);
    const response: Types.GetSignUrlResponse =
      await this.googleService.getSignUrl(data);

    return response;
  }

  @Get('sign/callback')
  @ApiOperation({ summary: 'Callback form google sign in', tags: ['Google'] })
  @ApiQuery({
    name: 'code',
    description: 'code that generate by google auth server',
    required: true,
  })
  async signCallback(
    @Request() req: RequestExpress,
  ): Promise<Types.SignCallbackResponse> {
    const data: Types.SignCallbackRequest =
      this.googleValidate.signCallback(req);
    const response: Types.SignCallbackResponse =
      await this.googleService.signCallback(data);

    return response;
  }
}
