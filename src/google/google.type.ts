export type GetTokenRequest = {
  userId: number;
};

export type GetTokenResponse = {
  access_token: string;
  refresh_token: string;
};

export type GetSignUrlRequest = {
  userId: number;
};

export type GetSignUrlResponse = {
  url: string;
};

export type SignCallbackRequest = {
  code: string;
};

export type SignCallbackResponse = {
  access_token: string;
  refresh_token: string;
};
