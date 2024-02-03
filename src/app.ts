import 'reflect-metadata';
import cors from 'cors';
import dotenv from 'dotenv';
import { json, urlencoded } from 'express';
import logger from './libs/logger';
import ExpressApplication from './bootstrap';
import UserController from './api/user.controller';
import ItemController from './api/item.controller';
import ResourceController from './api/resource.controller';
import errorHandler from './middleware/error.handler';

dotenv.config({ path: `${process.cwd()}/.env` });

const app = new ExpressApplication(
  process.env.PORT,
  [
    json({ limit: '10mb' }),
    urlencoded({ extended: true, limit: '10mb' }),
    cors(),
  ],
  [UserController, ItemController, ResourceController],
  errorHandler,
);

const server = app.start();

/* Handle SIGTERM */
process.on('SIGTERM', () => {
  logger.warn('SIGTERM signal received.');
  server.close(() => {
    logger.info('Process terminated.');
  });
});
