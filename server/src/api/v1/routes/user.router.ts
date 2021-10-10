import { Request, Response } from "express";
import UserService from "../services/user.service";

export function login(userService: UserService) {
  return async function (req: Request, res: Response) {
    let data = req.body;
    try {
      let token = await userService.login(data);
      res.status(200).send({ token });
    } catch (e) {
      let error = e as Error;
      res.status(400).send({ message: error.message });
    }
  };
}

export function register(userService: UserService) {
  return async function (req: Request, res: Response) {
    let data = req.body;
    try {
      let result = await userService.register(data);
      res.status(200).send({ message: "You've registered successfully!" });
    } catch (e) {
      let error = e as Error;
      res.status(400).send({ message: error.message });
    }
  };
}
