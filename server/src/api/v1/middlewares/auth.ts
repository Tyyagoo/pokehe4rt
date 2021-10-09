import { wrapper } from "../interfaces/types/middlewares";
import jwt from "jsonwebtoken";

const authToken: wrapper = () => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    // Bearer "token"
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
      return res.status(401).send({ message: "You must be authenticated." });

    jwt.verify(token, process.env.TOKEN_SECRET!, (err, payload) => {
      console.log(err);
      if (err) return res.status(403).send({ message: "Access denied." });
      req.jwt = payload;
      next();
    });
  };
};

const AuthMiddlewares = {
  authToken,
};

export = AuthMiddlewares;
