import dotenv from 'dotenv';
import express from 'express';
import ExpressApplication from './bootstrap';
import logger from './libs/logger';
import 'reflect-metadata';
import UserController from './api/user.controller';

dotenv.config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 3000;

const app = new ExpressApplication(
  PORT,
  [
    express.json({ limit: '10kb' }),
    express.urlencoded({ extended: true, limit: '10kb' }),
  ],
  [UserController],
);

const server = app.start();

/* Handle SIGTERM */
process.on('SIGTERM', () => {
  logger.warn('SIGTERM signal received.');
  server.close(() => {
    logger.info('Process terminated.');
  });
});
