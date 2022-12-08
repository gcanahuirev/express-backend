import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import logger from './libs/logger';
import ExpressApplication from './bootstrap';
import UserController from './api/user.controller';
import ItemController from './api/item.controller';
import ResourceController from './api/resource.controller';

dotenv.config({ path: `${process.cwd()}/.env` });

const PORT = process.env.PORT || 3000;

const app = new ExpressApplication(
  PORT,
  [
    express.json({ limit: '10kb' }),
    express.urlencoded({ extended: true, limit: '10kb' }),
  ],
  [UserController, ItemController, ResourceController],
);

const server = app.start();

/* Handle SIGTERM */
process.on('SIGTERM', () => {
  logger.warn('SIGTERM signal received.');
  server.close(() => {
    logger.info('Process terminated.');
  });
});
