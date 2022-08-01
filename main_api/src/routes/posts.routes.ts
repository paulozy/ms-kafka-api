import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreatePostController } from "../modules/posts/usecases/createPost/CreatePostController";

export const postsRoutes = Router();

const createPostController = new CreatePostController();

postsRoutes.post("/posts", ensureAuthenticated, createPostController.handle);
