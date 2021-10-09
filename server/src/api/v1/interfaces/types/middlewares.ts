import { Request, Response, NextFunction } from "express";

export type middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
export type wrapper = (...args: any) => middleware;
