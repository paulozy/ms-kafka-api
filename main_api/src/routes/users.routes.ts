import { Router } from "express";
import { createUserController } from "../modules/users/usecases/createUser";

export const userRoutes = Router();

userRoutes.post("/users", (req, res) => {
  return createUserController.handle(req, res);
});
