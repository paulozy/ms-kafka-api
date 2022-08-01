import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreatePostController } from "../modules/posts/usecases/createPost/CreatePostController";
import { UpdatePostController } from "../modules/posts/usecases/updatePost/UpdatePostController";

export const postsRoutes = Router();

const createPostController = new CreatePostController();
const updatePostController = new UpdatePostController();

postsRoutes.post("/posts", ensureAuthenticated, createPostController.handle);
postsRoutes.patch(
  "/posts/:id",
  ensureAuthenticated,
  updatePostController.handle
);
