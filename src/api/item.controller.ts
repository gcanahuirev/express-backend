import ItemService from './item.service';
import Controller from '../decorators/controller.decorator';

import { Request, Response } from 'express';
import { Get, Put } from '../decorators/handler.decorator';
import { SuccessResponse } from '../utils/apiResponse';

@Controller('/api/items')
export default class ItemController {
  private itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  @Get('')
  public async getItems(req: Request, res: Response) {
    const data = await this.itemService.getItems();
    return new SuccessResponse('Success', data).send(req, res);
  }

  @Get('/:id')
  public async getItemById(req: Request, res: Response) {
    const data = await this.itemService.getItemById(String(req.params.id));
    return new SuccessResponse('Success', data).send(req, res);
  }

  @Put('')
  public async createItem(req: Request, res: Response) {
    const data = await this.itemService.createItem(req.body);
    return new SuccessResponse('Success', data).send(req, res);
  }
}
