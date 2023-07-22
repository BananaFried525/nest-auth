import { Injectable, Logger } from '@nestjs/common';
import * as Types from './google.type';
import * as func from './google.func';
import configs from 'src/configs';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import path from 'path';
import { RedisService } from 'src/helpers/redis/redis.service';

@Injectable()
export class GoogleService {
  constructor(
    private readonly logger: Logger,
    private readonly redis: RedisService,
  ) {}

  async getToken({
    userId,
  }: Types.GetTokenRequest): Promise<Types.GetTokenResponse> {
    try {
      const CREDENTIALS_PATH = path.join(
        process.cwd(),
        configs.providerService.google.pathCert,
      );
      const client = await authenticate({
        scopes: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ],
        keyfilePath: CREDENTIALS_PATH,
      });
      const accessToken = await client.getAccessToken();
      const refreshToken = client.credentials.refresh_token;

      return {
        access_token: accessToken.token,
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async getSignUrl({
    userId,
  }: Types.GetSignUrlRequest): Promise<Types.GetSignUrlResponse> {
    try {
      const oauth = func.share.authClient();
      const url = oauth.generateAuthUrl({
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
        ],
        access_type: 'offline',
        login_hint: 'consent',
      });

      return {
        url: url,
      };
    } catch (error) {
      throw error;
    }
  }

  async signCallback({
    code,
  }: Types.SignCallbackRequest): Promise<Types.SignCallbackResponse> {
    try {
      const authClient = func.share.authClient();
      const token = await authClient.getToken(code);

      const accessToken = token.tokens.access_token;
      const refreshToken = token.tokens.refresh_token;

      authClient.setCredentials({
        access_token: accessToken,
      });
      const people = google.people({
        version: 'v1',
        auth: authClient,
      });

      const user = await people.people.get({
        resourceName: 'people/me',
        personFields: 'photos,names',
      });

      console.log(user);

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
