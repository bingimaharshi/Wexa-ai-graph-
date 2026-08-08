import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const env = {
  PORT: Number(process.env.PORT ?? 5000),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  COGNODB_URI: process.env.COGNODB_URI ?? 'bolt+s://demo.cognodb.local',
  COGNODB_USERNAME: process.env.COGNODB_USERNAME ?? 'cognodb',
  COGNODB_PASSWORD: process.env.COGNODB_PASSWORD ?? 'demo-password',
};
