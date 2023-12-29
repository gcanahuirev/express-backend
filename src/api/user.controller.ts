import logger from '../libs/logger';
import UserService from './user.service';
import Controller from '../decorators/controller.decorator';

import { Request, Response } from 'express';
import { Get, Put } from '../decorators/handler.decorator';

@Controller('/api/users')
export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Get('')
  public async getUsers(_req: Request, res: Response) {
    try {
      const data = await this.userService.getUsers();
      return res.status(200).send(data);
    } catch (err) {
      logger.error(err);
    }
  }

  @Get('/:id')
  public async getUserById(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(Number(req.params.id));
      return res.status(200).json(user);
    } catch (err) {
      logger.error(err);
    }
  }

  @Put('')
  public async createUser(req: Request, res: Response) {
    try {
      const data = await this.userService.createUser(req.body);
      return res.status(201).json(data);
    } catch (err) {
      logger.error(err);
    }
  }
}
