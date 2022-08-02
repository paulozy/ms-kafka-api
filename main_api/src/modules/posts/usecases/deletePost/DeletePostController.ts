import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePostUseCase } from "./DeletePostUseCase";

export class DeletePostController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { id: userId } = req.user;

    const deletePostUseCase = container.resolve(DeletePostUseCase);

    try {
      await deletePostUseCase.execute(id, userId);

      return res.status(204).json();
    } catch (error: any) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
  }
}
