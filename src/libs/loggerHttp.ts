import logger from './logger';
import pinoHttp from 'pino-http';
import { IncomingMessage, ServerResponse } from 'http';

const loggerHttp = pinoHttp({
  logger,
  wrapSerializers: false,
  customLogLevel: function (_req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent';
    }
    return 'info';
  },
  serializers: {
    req: (req: IncomingMessage) => ({
      method: req.method,
      url: req.url,
      host: req.headers.host,
      remoteAddress: req.socket.address,
      remotePort: req.socket.remotePort,
    }),
    res: (res: ServerResponse) => ({
      statusCode: res.statusCode,
    }),
    err: (err: Error) => ({
      message: err.message,
      stack: err.stack,
    }),
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
