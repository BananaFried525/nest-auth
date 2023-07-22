import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { TResponse } from './boots.type';
import { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    const responseData: TResponse<null> = {
      status_code: statusCode,
      error_message: exception.message,
      data: null,
    };

    response.status(statusCode).json(responseData);
  }
}

@Catch()
export class InternalServerErrorFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 500;

    const responseData: TResponse<null> = {
      status_code: status,
      error_message: exception.message,
      data: null,
    };

    response.status(status).json(responseData);
  }
}
