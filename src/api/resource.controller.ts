import logger from '../libs/logger';
import ResourceService from './resource.service';
import Controller from '../decorators/controller.decorator';

import { Request, Response } from 'express';
import { Get, Patch } from '../decorators/handler.decorator';

@Controller('/api/resources')
export default class ResourceController {
  private resourceService: ResourceService;

  constructor() {
    this.resourceService = new ResourceService();
  }

  @Get('')
  public async getResources(_req: Request, res: Response) {
    try {
      const data = await this.resourceService.getResources();
      return res.status(200).send(data);
    } catch (err) {
      logger.error(err);
    }
  }

  @Get('/:id')
  public async getResourceById(req: Request, res: Response) {
    try {
      const user = await this.resourceService.getResourceById(
        String(req.params.id),
      );
      return res.status(200).json(user);
    } catch (err) {
      logger.error(err);
    }
  }

  @Patch('')
  public async createResource(req: Request, res: Response) {
    try {
      const data = await this.resourceService.createResource(req.body);
      return res.status(201).json(data);
    } catch (err) {
      logger.error(err);
    }
  }
}
