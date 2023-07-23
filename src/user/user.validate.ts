import { BadRequestException, Injectable } from '@nestjs/common';
import * as Types from './user.type';
import { Request } from 'express';
import Joi from 'joi';

@Injectable()
export class UserValidate {
  registerUser(req: Request): Types.service.registerUserRequest {
    const data: Types.service.registerUserRequest = {
      providerName: req.body.provider_name,
      email: req.body.email,
      displayName: req.body.display_name,
    };
    const schema = Joi.object().keys({
      providerName: Joi.string().required().label('provider_name'),
      email: Joi.string().email().required().label('email'),
      displayName: Joi.string().required().label('display_name'),
    });

    const { value, error } = schema.validate(data, {
      allowUnknown: false,
      abortEarly: false,
    });
    if (error) {
      throw new BadRequestException(error);
    }

    return value;
  }
}
