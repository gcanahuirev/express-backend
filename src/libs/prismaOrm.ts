import logger from './logger';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

/* Enable this hook for debug queries */
/* prisma.$on('query', (e) => {
  const res = `\nQuery: ${e.query}\nParams: ${e.params}\nDuration: ${e.duration} ms`;
  logger.info(res);
}); */

export default prisma;
