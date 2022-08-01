import { Router } from "express";
import { authRoutes } from "./authenticate.routes";
import { userRoutes } from "./users.routes";

export const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes);
