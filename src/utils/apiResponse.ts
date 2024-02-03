import { Response, Request } from 'express';
import { HttpStatus } from './httpStatus';

enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003',
}

abstract class ApiResponse {
  constructor(
    protected statusCode: StatusCode,
    protected statusHttp: HttpStatus,
    protected message: string,
  ) {}

  protected prepare<T extends ApiResponse>(
    req: Request,
    res: Response,
    response: T,
    headers: { [key: string]: string },
  ): Response {
    for (const [key, value] of Object.entries(headers)) res.append(key, value);
    if (this.statusCode !== '10000') {
      const errorResponse = ApiResponse.report(req);
      return res.status(this.statusHttp).send({
        statusCode: this.statusCode,
        statusHttp: this.statusHttp,
        error: this.message,
        ...errorResponse,
      });
    }
    return res.status(this.statusHttp).json(ApiResponse.sanitize(response));
  }

  public send(
    req: Request,
    res: Response,
    headers: { [key: string]: string } = {},
  ): Response {
    return this.prepare<ApiResponse>(req, res, this, headers);
  }

  private static report(req: Request) {
    return {
      path: req.url,
      method: req.method,
      timeStamp: new Date().toLocaleString('es-PE', {
        timeZone: 'America/Lima',
      }),
    };
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    delete clone.statusHttp;
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    return clone;
  }
}

export class NotFoundResponse extends ApiResponse {
  constructor(message = 'Not Found') {
    super(StatusCode.FAILURE, HttpStatus.NOT_FOUND, message);
  }

  send(
    req: Request,
    res: Response,
    headers: { [key: string]: string } = {},
  ): Response {
    return super.prepare<NotFoundResponse>(req, res, this, headers);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message = 'Forbidden') {
    super(StatusCode.FAILURE, HttpStatus.FORBIDDEN, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Parameters') {
    super(StatusCode.FAILURE, HttpStatus.BAD_REQUEST, message);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Internal Error') {
    super(StatusCode.FAILURE, HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, HttpStatus.OK, message);
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, HttpStatus.OK, message);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(
    message: string,
    private data: T,
  ) {
    super(StatusCode.SUCCESS, HttpStatus.OK, message);
  }

  send(
    req: Request,
    res: Response,
    headers: { [key: string]: string } = {},
  ): Response {
    return super.prepare<SuccessResponse<T>>(req, res, this, headers);
  }
}
