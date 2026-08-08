import { env } from './env.js';

export const graphDbConfig = {
  uri: env.COGNODB_URI,
  username: env.COGNODB_USERNAME,
  password: env.COGNODB_PASSWORD,
};

export const verifyDatabaseConnection = async (): Promise<boolean> => {
  try {
    if (!graphDbConfig.uri || !graphDbConfig.username || !graphDbConfig.password) {
      return false;
    }
    return true;
  } catch (_error) {
    return false;
  }
};
