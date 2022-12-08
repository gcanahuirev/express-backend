import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      levelFirst: true,
      translateTime: 'SYS:dd-mm-yyyy h:MM:ss TT Z',
      ignore: 'pid,hostname',
      colorize: true,
    },
    level: 'debug',
  },
});

export default logger;
