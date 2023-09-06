import { User } from '@prisma/client';
import prisma from '../libs/prismaOrm';

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
    return user;
  }
}
