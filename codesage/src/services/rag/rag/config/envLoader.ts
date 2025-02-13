import "dotenv/config";
import fs from "fs-extra";
import readline from "readline";
import path from "path";

// List of required environment variables
const REQUIRED_ENV_VARS = [
  "OPENAI_API_KEY",
  "PINECONE_API_KEY",
  "PINECONE_INDEX_NAME",
];

export async function loadEnv(): Promise<void> {
  // Check if .env exists in the current working directory
  const defaultEnvPath = path.resolve(".env");
  let envPath = defaultEnvPath;

  if (!fs.existsSync(defaultEnvPath)) {
    console.warn(`No .env file found in the current directory: ${defaultEnvPath}`);

    // Create a readline interface for user input
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Prompt the user for the absolute path to the .env file
    envPath = await new Promise<string>((resolve) => {
      rl.question("Enter the absolute path to your .env file: ", (input: string) => {
        resolve(input.trim());
        rl.close();
      });
    });

    if (!fs.existsSync(envPath)) {
      throw new Error(`The specified .env file does not exist: ${envPath}`);
    }

    console.log(`Loading environment variables from: ${envPath}`);
  } else {
    console.log(`Loading environment variables from: ${defaultEnvPath}`);
  }

  // Load the .env file manually using dotenv
  const dotenv = await import("dotenv");
  const result = dotenv.config({ path: envPath });

  if (result.error) {
    throw new Error(`Failed to load .env file: ${result.error.message}`);
  }

  const missingVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }

  console.log("All required environment variables are present.");


}