/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import logger from './libs/logger';
import loggerHttp from './libs/loggerHttp';
import MetadataKeys from './utils/metadataKeys';
import databaseConnection from './libs/typegoose';

import express, { Application, Handler } from 'express';
import { IRouter } from './decorators/handler.decorator';
import asyncHandler from './middleware/async.handler';

class ExpressApplication {
  private app: Application;

  constructor(
    private port: string | number,
    private middlewares: any[],
    private controllers: any[],
    private exception: any,
  ) {
    this.app = express();
    this.port = port;
    this.middlewares = middlewares;
    this.controllers = controllers;
    this.exception = exception;

    /* __init__ */
    this.setupLogger();
    this.setupAssets();
    this.setupMiddlewares(this.middlewares);
    this.setupRoutes(this.controllers);
    this.setupException(this.exception);
  }

  private setupMiddlewares(middlewares: any[]) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private setupRoutes(controllers: any[]) {
    const info: Array<{ METHOD: string; PATH: string; HANDLER: string }> = [];
    controllers.forEach((Controller) => {
      const controllerInstance: { [handlerName: string]: Handler } =
        new Controller();

      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        Controller,
      );

      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        Controller,
      );

      const expressRouter = express.Router();
      routers.forEach(({ method, handlerPath, middlewares, handlerName }) => {
        if (middlewares) {
          expressRouter[method](
            handlerPath,
            ...middlewares,
            asyncHandler(
              controllerInstance[String(handlerName)].bind(controllerInstance),
            ),
          );
        } else {
          expressRouter[method](
            handlerPath,
            asyncHandler(
              controllerInstance[String(handlerName)].bind(controllerInstance),
            ),
          );
        }

        info.push({
          METHOD: method.toLocaleUpperCase(),
          PATH: `${basePath}${handlerPath}`,
          HANDLER: `${Controller.name}.${String(handlerName)}`,
        });
      });

      this.app.use(basePath, expressRouter);
    });
    console.table(info);
  }

  private setupException(exception: any) {
    this.app.use(exception);
  }

  private setupAssets() {
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  private setupLogger() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(loggerHttp);
    }
  }

  public start() {
    return this.app.listen(this.port, () => {
      logger.info(`Server is running on port ${this.port}`);
      databaseConnection();
    });
  }
}

export default ExpressApplication;
