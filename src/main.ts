import dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './boots/transform.interceptor';
import { NotFoundFilter } from './boots/not-found.filter';
import { LoggerService } from './helpers/logger/logger.service';
import {
  BadRequestFilter,
  InternalServerErrorFilter,
} from './boots/custom.filter';

import configs from './configs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService().getConfig(),
  });
  app.setGlobalPrefix('v1');
  app.useGlobalFilters(
    new NotFoundFilter(),
    new BadRequestFilter(),
    new InternalServerErrorFilter(),
  );
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('BananaFried Auth')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configs.port);
}
bootstrap();
