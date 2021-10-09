import { Prisma } from ".prisma/client";
import { autoInjectable } from "tsyringe";
import UserRepository from "../repositories/user.repository";
import { UserDetails } from "../models/user.model";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../helpers/auth.helper";

@autoInjectable()
export default class UserService {
  saltRounds = 10;
  constructor(private userRepository: UserRepository) {}

  async login(data: any) {
    let userDetails = UserDetails.fromJson(data);
    let user = await this.userRepository.findUserByUsername(
      userDetails.username
    );
    let result = await bcrypt.compare(userDetails.password, user.password);
    if (result) {
      const token = generateAccessToken(userDetails.username);
      return token;
    }
    throw new Error("Invalid credentials.");
  }

  async logout(data: any) {}

  async register(data: any) {
    let userDetails = UserDetails.fromJson(data);
    if (!userDetails.canRegister()) throw new Error("Email cannot be empty");

    let key = crypto.randomBytes(16).toString("hex");
    let sha256Hasher = crypto.createHmac("sha256", key);

    let ehash = sha256Hasher.update(userDetails.email!).digest("hex");
    let phash = await bcrypt.hash(userDetails.password, this.saltRounds);

    let user: Prisma.UserCreateInput = {
      emailEncrypted: ehash,
      emailKey: key,
      password: phash,
      profile: {
        create: {
          username: userDetails.username,
        },
      },
    };
    try {
      let u = await this.userRepository.createUser(user);
      return u;
    } catch {
      throw new Error("There is already an account with this username");
    }
  }
}
