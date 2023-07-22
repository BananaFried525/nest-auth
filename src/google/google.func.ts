import { google } from 'googleapis';
import configs from 'src/configs';

export namespace share {
  export const authClient = () => {
    const oauth = new google.auth.OAuth2({
      clientId: configs.providerService.google.clientId,
      clientSecret: configs.providerService.google.clientSecret,
      redirectUri: `${configs.baseUrl}/v1/google/sign/callback`,
    });

    return oauth;
  };
}
