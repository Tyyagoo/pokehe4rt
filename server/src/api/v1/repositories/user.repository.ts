import prisma from "./index";
import { Prisma } from ".prisma/client";

export default class UserRepository {
  users = prisma.user;
  usersProfile = prisma.userProfile;

  async findUserByUsername(username: string) {
    let profile = await this.findUserProfileByUsername(username);
    if (profile == null) throw new Error("Invalid username.");
    let id = profile.id;
    let user = (await this.users.findUnique({ where: { id } }))!;
    return {
      ...user,
      profile,
    };
  }

  async findUserProfileByUsername(username: string) {
    return await this.usersProfile.findUnique({ where: { username } });
  }

  async createUser(user: Prisma.UserCreateInput) {
    return await this.users.create({ data: user });
  }
}
