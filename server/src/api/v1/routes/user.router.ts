import { Request, Response } from "express";
import UserService from "../services/user.service";

export function login(userService: UserService) {
  return async function (req: Request, res: Response) {
    let data = req.body;
    try {
      let token = await userService.login(data);
      res.status(200).send({ data: { token } });
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
      res
        .status(400)
        .send({ message: "There's already a user with that username." });
    }
  };
}

export function getAllUsers(userService: UserService) {
  return async function (req: Request, res: Response) {
    let data = await userService.getAllUsers();
    return res.status(200).send({ data });
  };
}

export function getUserByUsername(userService: UserService) {
  return async function (req: Request, res: Response) {
    let username = req.params.username;
    let data = await userService.getUser(username);
    if (data !== null) {
      res.status(200).send({ data });
    } else {
      res
        .status(404)
        .send({ message: "Doesn't exists a user with this username." });
    }
  };
}
