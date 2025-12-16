import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  geocodingApiKey: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || '', 
  geocodingApiKey: process.env.GEOCODING_API_KEY || '',
};

if (!config.databaseUrl) {
  throw new Error('DATABASE_URL is not defined in .env');
}
 export default config;