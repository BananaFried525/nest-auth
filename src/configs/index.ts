export default {
  appName: process.env.APP_NAME || 'nest-auth',
  baseUrl: process.env.BASE_URL || 'http://localhost:8089',
  port: Number(process.env.PORT) || 8089,
  nodeEnv: process.env.NODE_ENV || 'local',
  privateCert: process.env.PRIVATE_CERT || '',
  publicCert: process.env.PUBLIC_CERT || '',
  redis: {
    host: process.env.REDIS_HOST || '',
    port: Number(process.env.REDIS_PORT) || 55000,
    secret: process.env.REDIS_SECRET || '',
  },
  database: {
    mysql: {
      host: process.env.DATABASE_MYSQL_HOST || '',
      port: Number(process.env.DATABASE_MYSQL_PORT) || 56000,
      database: process.env.DATABASE_MYSQL_DATABASE || '',
      username: process.env.DATABASE_MYSQL_USER_NAME || '',
      password: process.env.DATABASE_MYSQL_PASSWORD || '',
    },
  },
  providerService: {
    google: {
      pathCert: process.env.CERT_GOOGLE_PATH || '',
      clientId: process.env.PROVIDER_SERVICE_GOOGLE_CLIENT_ID || '',
      projectId: process.env.PROVIDER_SERVICE_GOOGLE_PROJECT_ID || '',
      authUri: process.env.PROVIDER_SERVICE_GOOGLE_AUTH_URI || '',
      tokenUri: process.env.PROVIDER_SERVICE_GOOGLE_TOKEN_URI || '',
      authCert: process.env.PROVIDER_SERVICE_GOOGLE_AUTH_CERT || '',
      clientSecret: process.env.PROVIDER_SERVICE_GOOGLE_CLIENT_SECRET || '',
    },
  },
};
