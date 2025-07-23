import express from 'express';
import payload from 'payload';
import { resolve } from 'path';
import { config } from 'dotenv';
import payloadConfig from './config';

// Load environment variables
config();

const app = express();

// Initialize Payload
const start = async () => {
  await payload.init({
    config: payloadConfig,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express middleware here
  app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  app.listen(3000, () => {
    console.log('Payload CMS server running on http://localhost:3000');
  });
};

start(); 