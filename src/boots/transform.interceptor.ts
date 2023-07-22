import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import { TResponse } from './boots.type';
import dayjs from 'dayjs';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, TResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<TResponse<T>> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const startDate = dayjs();
    return next.handle().pipe(
      map((data) => {
        const _response: TResponse<T> = {
          status_code: res.statusCode,
          error_message: null,
          data,
        };

        Logger.log(`ms: ${dayjs().diff(startDate, 'ms')}`);
        Logger.log(`[${req.method}] ${req.url}|${req.ip}`);
        return _response;
      }),
    );
  }
}
