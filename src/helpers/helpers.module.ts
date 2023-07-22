import { Module } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { RedisService } from './redis/redis.service';

@Module({
  providers: [LoggerService, RedisService],
})
export class HelpersModule {}
