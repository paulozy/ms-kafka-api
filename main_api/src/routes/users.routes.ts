import { Router } from "express";
import { createUserController } from "../modules/users/usecases/createUser";
import { updateUserController } from "../modules/users/usecases/updateUser";

export const userRoutes = Router();

userRoutes.post("/users", (req, res) => {
  return createUserController.handle(req, res);
});

userRoutes.patch("/users", (req, res) => {
  return updateUserController.handle(req, res);
});
