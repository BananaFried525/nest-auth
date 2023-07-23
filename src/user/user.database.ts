import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as Types from 'src/user/user.type'
import * as Models from 'src/helpers/database/models'
import { FindOptions, Transaction, WhereOptions } from 'sequelize';

@Injectable()
export class UserDatabase {
  constructor(
    @InjectModel(Models.User)
    private userModel: typeof Models.User,
    @InjectModel(Models.Provider)
    private providerModel: typeof Models.Provider
  ) { }

  async createUser({
    value,
    dbTxn,
  }: Types.database.createUserParams): Promise<Models.User> {
    const user = await this.userModel.create(value, { transaction: dbTxn })
    return user
  }

  async getProviderByShortName({
    shortName,
    dbTxn
  }: Types.database.getProviderByShortName): Promise<Models.Provider | null> {
    const option: FindOptions<Models.Provider> = {
      where: {
        shortName: shortName,
      },
      include: [
        {
          model: Models.User,
        }
      ],
      transaction: dbTxn,
    }

    const provider = await this.providerModel.findOne(option)
    return provider
  }
}