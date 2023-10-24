import dotenv from 'dotenv';

dotenv.config();

const database =
  process.env.NODE_ENVIRONMENT === 'dev'
    ? process.env.DATABASE_NAME
    : process.env.DATABASE_TEST_NAME;

const configs = {
  env: process.env.NODE_ENVIRONMENT,
  host: process.env.NODE_SERVICE_HOST,
  port: Number(process.env.NODE_SERVICE_PORT),
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_HOST),
    name: database,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_USERNAME
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  },
  encryption: {
    salt: Number(process.env.SECRET_SALT),
    pepper: process.env.SECRET_PEPPER
  },
  jwt: {
    access_token: process.env.JWT_SECRET_ACCESS_TOKEN,
    refresh_token: process.env.JWT_SECRET_REFRESH_TOKEN,
    access_expires: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION),
    refresh_expires: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION)
  },
  backend_host: process.env.NODE_SERVICE_HOST
};
export default configs;
