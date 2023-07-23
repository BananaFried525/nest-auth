import { Module } from '@nestjs/common';
import { GoogleModule } from './google/google.module';
import { HelpersModule } from './helpers/helpers.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import configs from './configs';
import * as Models from 'src/helpers/database/models'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: configs.database.mysql.host,
      port: configs.database.mysql.port,
      username: configs.database.mysql.username,
      password: configs.database.mysql.password,
      database: configs.database.mysql.database,
      logging: true,
      models: [Models.User, Models.Provider],
    }),
    GoogleModule,
    HelpersModule,
    UserModule,
  ],
})
export class AppModule { }
