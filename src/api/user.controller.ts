import { Request, Response } from 'express';
import Controller from '../decorators/controller.decorator';
import { Get } from '../decorators/handler.decorator';
import UserService from './user.service';

@Controller('/api/users')
export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Get('/test')
  public async getUser(req: Request, res: Response) {
    return this.userService.getUser(req, res);
  }
}
