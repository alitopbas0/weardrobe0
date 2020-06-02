import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/web',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  VISA_CLIENT_ID: process.env.VISA_CLIENT_ID || 'sb',
};
