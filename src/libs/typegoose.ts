import mongoose from 'mongoose';
import logger from './logger';

async function databaseConnection() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('Successful mongodb connection');
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
}

export default databaseConnection;
