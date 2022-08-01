import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { CreatePostUseCase } from "./CreatePostUseCase";

export class CreatePostController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { content, title } = req.body;
    const { id: authorId } = req.user;

    const createPostUseCase = container.resolve(CreatePostUseCase);

    try {
      await createPostUseCase.execute({ authorId, content, title });
      return res.status(201).json();
    } catch (error) {
      throw new AppError("Error creating post", 400);
    }
  }
}
