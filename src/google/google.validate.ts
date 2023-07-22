import { BadRequestException, Injectable } from '@nestjs/common';
import * as Types from './google.type';
import { Request } from 'express';
import Joi from 'joi';

@Injectable()
export class GoogleValidate {
  getToken(req: Request): Types.GetTokenRequest {
    const data = {
      userId: req.get('x-user-id'),
    };
    const schema = Joi.object().keys({
      userId: Joi.number().required().label('user_id'),
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

  getSignUrl(req: Request): Types.GetSignUrlRequest {
    const data = {
      userId: req.get('x-user-id'),
    };
    const schema = Joi.object().keys({
      userId: Joi.number().required().label('user_id'),
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

  signCallback(req: Request): Types.SignCallbackRequest {
    const data = {
      code: req.query.code,
    };
    const schema = Joi.object().keys({
      code: Joi.string().required().label('authentication'),
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
