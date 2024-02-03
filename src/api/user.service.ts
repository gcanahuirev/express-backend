import { User } from '@prisma/client';
import prisma from '../libs/prismaOrm';
import { BadRequestError, NotFoundError } from '../utils/apiError';

export default class UserService {
  public async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  public async getUserById(id: User['id']) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundError('User does not exists');
    return user;
  }

  public async createUser(body: Partial<User>) {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        age: body.age,
      },
    });
    if (!user) throw new BadRequestError('User could not be created');
    return user;
  }
}
