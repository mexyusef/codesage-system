import * as dotenv from 'dotenv';
import * as path from 'path';
import { getDirname } from './getDirname';

function loadEnv() {
  let __dirname__;
  __dirname__ = getDirname();


  const env = process.env.NODE_ENV || 'development';

  // Load the appropriate .env file based on the environment
  const envPath = path.resolve(__dirname__, `../.env.${env}`);

  // Load the .env file
  dotenv.config({ path: envPath });

  // Optionally, you can load a default .env file if no specific environment file is found
  dotenv.config({ path: path.resolve(__dirname__, './.env') });

  // Log the environment variables (optional)
  console.log(`Loaded environment variables for ${env} environment`);
}

export default loadEnv;