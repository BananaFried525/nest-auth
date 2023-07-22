import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';

@Injectable()
export class LoggerService {
  getConfig() {
    const instanceLogger = createLogger({
      level: 'debug',
      format: format.combine(format.timestamp(), format.json()),
      transports: [new transports.Console()],
    });

    return WinstonModule.createLogger(instanceLogger);
  }
}
