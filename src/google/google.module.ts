import { Logger, Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { GoogleValidate } from './google.validate';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from 'src/helpers/redis/redis.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [GoogleController],
  providers: [GoogleService, Logger, GoogleValidate, RedisService],
})
export class GoogleModule {}
