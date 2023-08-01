export interface AppEnvironment {
  NODE_ENV: string;
  VERSION: string;
  APP: {
    PORT: number;
    NAME: string;
  };
  DATABASE: {
    POSTGRESQL: {
      USERNAME: string;
      PASSWORD: string;
      HOST: string;
      PORT: number;
      NAME: string;
    };
  };
  CLIENT_SECRET_KEY: string;
  SECURE: {
    SECRET_KEY: string;
    JWT: {
      JWT_SECRET: string;
      EXPIRE: number;
    };
  };
  LOGS: {
    PATH: {
      ERROR: string;
      SUCCESS: string;
    };
  };
  STORAGE: {
    DOMAIN: string;
    ROOT: string;
  };
  MAIL_CONFIG: {
    FROM: string;
    SMTP_CONFIG: {
      service: string;
      host: string;
      port: number;
      auth: {
        user: string;
        pass: string;
      };
    };
    WEB_URL: string;
  };
}
