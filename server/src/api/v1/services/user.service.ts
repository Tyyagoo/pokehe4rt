import { Prisma } from ".prisma/client";
import { autoInjectable } from "tsyringe";
import UserRepository from "../repositories/user.repository";
import { UserDetails } from "../models/user.model";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../helpers/auth.helper";

@autoInjectable()
export default class UserService {
  saltRounds = 10;
  constructor(private userRepository: UserRepository) {}

  async getUser(username: string) {
    return this.userRepository.findUserProfileByUsername(username);
  }

  async getAllUsers() {
    return this.userRepository.findAllUsers();
  }

  async login(data: any) {
    let userDetails = UserDetails.fromJson(data);
    let user = await this.userRepository.findUserByUsername(
      userDetails.username
    );
    if (user != null) {
      let result = await bcrypt.compare(userDetails.password, user.password);
      if (result) {
        const token = generateAccessToken(userDetails.username);
        return token;
      }
    }
    throw new Error("Invalid credentials.");
  }

  async logout(data: any) {}

  async register(data: any) {
    let userDetails = UserDetails.fromJson(data);
    let phash = await bcrypt.hash(userDetails.password, this.saltRounds);
    let user = await this.userRepository.createUser({
      username: userDetails.username,
      password: phash,
    });
    return user;
  }
}
