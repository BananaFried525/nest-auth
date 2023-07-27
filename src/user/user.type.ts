import { Transaction } from 'sequelize'
import * as Models from 'src/helpers/database/models'

export namespace service {
  export type registerUserRequest = {
    providerName: string,
    email: string,
    displayName: string
  }

  export type registerUserResponse = {
  }

  export type signWithGoogleParams = {

  }

  export type signWithGoogleResponse = {
    
  }
}

export namespace database {
  export type createUserParams = {
    value: Partial<Models.User>;
    dbTxn: Transaction;
  }

  export type getProviderByShortName = {
    shortName: string,
    dbTxn: Transaction;
  }
}