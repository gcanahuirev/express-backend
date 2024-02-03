import { Request, Response, NextFunction } from 'express';
import { ApiError, InternalError } from '../utils/apiError';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, req, res);
  } else {
    ApiError.handle(new InternalError(), req, res);
  }
};

export default errorHandler;
