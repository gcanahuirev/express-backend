import { Request, Response } from 'express';
import {
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ForbiddenResponse,
} from './apiResponse';

export enum ErrorType {
  BAD_TOKEN = 'BadTokenError',
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
  NO_ENTRY = 'NoEntryError',
  NO_DATA = 'NoDataError',
  BAD_REQUEST = 'BadRequestError',
  FORBIDDEN = 'ForbiddenError',
}

export abstract class ApiError extends Error {
  constructor(
    public type: ErrorType,
    public message: string = 'error',
  ) {
    super(type);
  }

  public static handle(err: ApiError, req: Request, res: Response): Response {
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message).send(req, res);
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
      case ErrorType.NO_DATA:
        return new NotFoundResponse(err.message).send(req, res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(req, res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(err.message).send(req, res);
      default: {
        let message = err.message;
        // Do not send failure message in production as it may send sensitive data
        if (process.env.NODE_ENV === 'production')
          message = 'Something wrong happened.';
        return new InternalErrorResponse(message).send(req, res);
      }
    }
  }
}

export class InternalError extends ApiError {
  constructor(message = 'Internal error') {
    super(ErrorType.INTERNAL, message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(ErrorType.BAD_REQUEST, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Permission denied') {
    super(ErrorType.FORBIDDEN, message);
  }
}

export class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists") {
    super(ErrorType.NO_ENTRY, message);
  }
}

export class BadTokenError extends ApiError {
  constructor(message = 'Token is not valid') {
    super(ErrorType.BAD_TOKEN, message);
  }
}

export class NoDataError extends ApiError {
  constructor(message = 'No data available') {
    super(ErrorType.NO_DATA, message);
  }
}
