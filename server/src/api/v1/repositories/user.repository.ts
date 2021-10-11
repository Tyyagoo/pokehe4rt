import prisma from "./index";
import { Prisma } from ".prisma/client";

export default class UserRepository {
  private users = prisma.user;

  // this only can be used inside this application, never send this obj as a response.
  async findUserByUsername(username: string) {
    return await this.users.findUnique({ where: { username } });
  }

  async findUserProfileByUsername(username: string) {
    return await this.users.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: false,
        createdAt: true,
        Characters: false,
      },
    });
  }

  async findAllUsers() {
    return await this.users.findMany({
      select: {
        id: true,
        username: true,
        password: false,
        createdAt: true,
        Characters: false,
      },
    });
  }

  async createUser(user: Prisma.UserCreateInput) {
    return await this.users.create({ data: user });
  }
}
