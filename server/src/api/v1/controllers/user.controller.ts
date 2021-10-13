import express, { Router } from "express";
import { autoInjectable } from "tsyringe";
import { authToken } from "../middlewares";
import {
  getAllUsers,
  getUserByUsername,
  login,
  register,
} from "../routes/user.router";

import UserService from "../services/user.service";

@autoInjectable()
export default class UserController {
  private router: Router;
  constructor(private userService: UserService) {
    this.router = express.Router();
  }

  routes() {
    this.router.get("/", authToken(), getAllUsers(this.userService));
    this.router.get(
      "/:username",
      authToken(),
      getUserByUsername(this.userService)
    );
    this.router.post("/login", login(this.userService));
    this.router.post("/register", register(this.userService));
    return this.router;
  }
}
