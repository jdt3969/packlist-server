import dotenv from 'dotenv';
import 'module-alias/register';
import 'reflect-metadata';
// Reads in .env file
dotenv.config();

// Catch all for errors
process.on('unhandledRejection', (error) => {
  console.error(error);
});
