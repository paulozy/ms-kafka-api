import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/users/usecases/createUser/CreateUserController";
import { DeleteUserController } from "../modules/users/usecases/deleteUser/DeleteUserController";
import { ShowUserController } from "../modules/users/usecases/showUser/ShowUserController";
import { UpdateUserController } from "../modules/users/usecases/updateUser/UpdateUserController";

export const userRoutes = Router();

const showUserController = new ShowUserController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

userRoutes.post("/users", createUserController.handle);

userRoutes.get("/users", ensureAuthenticated, showUserController.handle);
userRoutes.patch("/users", ensureAuthenticated, updateUserController.handle);
userRoutes.delete("/users", ensureAuthenticated, deleteUserController.handle);
