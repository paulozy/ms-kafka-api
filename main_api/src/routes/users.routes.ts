import { Router } from "express";
import { CreateUserController } from "../modules/users/usecases/createUser/CreateUserController";
import { UpdateUserController } from "../modules/users/usecases/updateUser/UpdateUserController";

export const userRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();

userRoutes.post("/users", createUserController.handle);
userRoutes.patch("/users", updateUserController.handle);
