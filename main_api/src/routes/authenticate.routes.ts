import { Router } from "express";
import { AuthenticateUserController } from "../modules/users/usecases/createSession/AuthenticateUserController";

export const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authRoutes.post("/login", authenticateUserController.handle);
