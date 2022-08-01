import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { UpdatePostUseCase } from "./UpdatePostUseCase";

export class UpdatePostController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { title, content } = req.body;
    const { id: userId } = req.user;
    const { id } = req.params;

    const updatePostUseCase = container.resolve(UpdatePostUseCase);

    try {
      await updatePostUseCase.execute({ title, content }, id, userId);

      return res.status(200).json();
    } catch (error: any) {
      throw new AppError(`${error.message}`, 400);
    }
  }
}
