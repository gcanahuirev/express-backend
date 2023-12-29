import logger from '../libs/logger';
import ItemService from './item.service';
import Controller from '../decorators/controller.decorator';

import { Request, Response } from 'express';
import { Get, Put } from '../decorators/handler.decorator';

@Controller('/api/items')
export default class ItemController {
  private itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  @Get('')
  public async getItems(_req: Request, res: Response) {
    try {
      const data = await this.itemService.getItems();
      return res.status(200).send(data);
    } catch (err) {
      logger.error(err);
    }
  }

  @Get('/:id')
  public async getItemById(req: Request, res: Response) {
    try {
      const user = await this.itemService.getItemById(String(req.params.id));
      return res.status(200).json(user);
    } catch (err) {
      logger.error(err);
    }
  }

  @Put('')
  public async createItem(req: Request, res: Response) {
    try {
      const data = await this.itemService.createItem(req.body);
      return res.status(201).json(data);
    } catch (err) {
      logger.error(err);
    }
  }
}
