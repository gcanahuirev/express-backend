import ResourceService from './resource.service';
import Controller from '../decorators/controller.decorator';

import { Request, Response } from 'express';
import { Get, Put } from '../decorators/handler.decorator';
import { SuccessResponse } from '../utils/apiResponse';

@Controller('/api/resources')
export default class ResourceController {
  private resourceService: ResourceService;

  constructor() {
    this.resourceService = new ResourceService();
  }

  @Get('')
  public async getResources(req: Request, res: Response) {
    const data = await this.resourceService.getResources();
    return new SuccessResponse('Success', data).send(req, res);
  }

  @Get('/:id')
  public async getResourceById(req: Request, res: Response) {
    const data = await this.resourceService.getResourceById(
      String(req.params.id),
    );
    return new SuccessResponse('Success', data).send(req, res);
  }

  @Put('')
  public async createResource(req: Request, res: Response) {
    const data = await this.resourceService.createResource(req.body);
    return new SuccessResponse('Success', data).send(req, res);
  }
}
