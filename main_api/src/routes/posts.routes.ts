import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreatePostController } from "../modules/posts/usecases/createPost/CreatePostController";
import { DeletePostController } from "../modules/posts/usecases/deletePost/DeletePostController";
import { ShowAllPostsController } from "../modules/posts/usecases/showAllUserPost/ShowAllPostsController";
import { UpdatePostController } from "../modules/posts/usecases/updatePost/UpdatePostController";

export const postsRoutes = Router();

const createPostController = new CreatePostController();
const updatePostController = new UpdatePostController();
const deletePostController = new DeletePostController();
const showAllPostsController = new ShowAllPostsController();

postsRoutes.get("/posts", ensureAuthenticated, showAllPostsController.handle)

postsRoutes.post("/posts", ensureAuthenticated, createPostController.handle);

postsRoutes.patch(
  "/posts/:id",
  ensureAuthenticated,
  updatePostController.handle
);

postsRoutes.delete(
  "/posts/:id",
  ensureAuthenticated,
  deletePostController.handle
);
