import logger from './logger';
import pinoHttp from 'pino-http';
import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

const loggerHttp = pinoHttp({
  logger,
  wrapSerializers: false,

  genReqId: function (req, res) {
    const existingID = req.id ?? req.headers['x-request-id'];
    if (existingID) return existingID;
    const id = randomUUID();
    res.setHeader('X-Request-Id', id);
    return id;
  },

  customLogLevel: function (_req, res, err) {
    if (res.statusCode >= 500 || err) {
      return 'error';
    } else if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent';
    } else if (res.statusCode >= 200 && res.statusCode < 300) {
      return 'info';
    }
    return 'debug';
  },

  serializers: {
    req: (req: Request) => ({
      uuid: req.id,
      method: req.method,
      url: req.url,
      host: req.headers.host,
      remoteAddress: req.socket.remoteAddress,
      remotePort: req.socket.remotePort,
    }),
    res: (res: Response) => ({
      statusCode: res.statusCode,
    }),
    err: (err: Error) => err.message,
  },

  // Define a custom success message
  customSuccessMessage: function () {
    return 'request completed';
  },

  // Define a custom receive message
  customReceivedMessage: function () {
    return 'incoming request';
  },

  // Define a custom error message
  customErrorMessage: function () {
    return 'request errored';
  },
});

export default loggerHttp;
