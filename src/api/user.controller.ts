import UserService from './user.service';
import Controller from '../decorators/controller.decorator';

import { Request, Response } from 'express';
import { Get, Put } from '../decorators/handler.decorator';
import { SuccessResponse } from '../utils/apiResponse';

@Controller('/api/users')
export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Get('')
  public async getUsers(req: Request, res: Response) {
    const data = await this.userService.getUsers();
    return new SuccessResponse('Success', data).send(req, res);
  }

  @Get('/:id')
  public async getUserById(req: Request, res: Response) {
    const data = await this.userService.getUserById(Number(req.params.id));
    return new SuccessResponse('Success', data).send(req, res);
  }

  @Put('')
  public async createUser(req: Request, res: Response) {
    const data = await this.userService.createUser(req.body);
    return new SuccessResponse('Success', data).send(req, res);
  }
}
