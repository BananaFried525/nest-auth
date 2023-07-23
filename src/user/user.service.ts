import { Injectable, Logger, Post } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { RedisService } from 'src/helpers/redis/redis.service';
import * as Types from './user.type';
import { Transaction } from 'sequelize';
import { UserDatabase } from './user.database';
import { BadRequestFilter } from 'src/boots/custom.filter';

@Injectable()
export class UserService {
  constructor(
    // private readonly logger: Logger,
    // private readonly redis: RedisService,
    private readonly sequelize: Sequelize,
    private readonly database: UserDatabase,
  ) { }

  async registerUser({
    providerName,
    email,
    displayName,
  }: Types.service.registerUserRequest): Promise<Types.service.registerUserResponse> {
    let dbTxn: Transaction
    try {
      dbTxn = await this.sequelize.transaction()

      const provider = await this.database.getProviderByShortName({
        shortName: providerName,
        dbTxn,
      })
      if(!provider)  {
        throw new Error('provider not found.')
      }

      await dbTxn.commit()
      return {}
    } catch (error) {
      if (dbTxn) {
        await dbTxn.rollback()
      }

      throw error
    }
  }

}
