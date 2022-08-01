import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { Authentication } from "../utils/authentication/implementations/Authentication";

const authenticator = new Authentication();

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    authenticator.verifyToken(token);
    next();
  } catch (error) {
    throw new AppError(`${error}`, 500);
  }
}
