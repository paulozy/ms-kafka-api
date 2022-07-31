import { Router } from "express";
import { userRoutes } from "./users.routes";

export const routes = Router();

routes.use(userRoutes);
