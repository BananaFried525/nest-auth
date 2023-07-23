import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDatabase } from './user.database';
import { UserController } from './user.controller';
import * as Models from 'src/helpers/database/models'
import { SequelizeModule } from '@nestjs/sequelize';
import { UserValidate } from './user.validate';

@Module({
  imports: [SequelizeModule.forFeature([Models.User, Models.Provider])],
  providers: [UserService, UserDatabase, UserValidate],
  controllers: [UserController]
})
export class UserModule { }
