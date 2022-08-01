import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    deleteUserUseCase.execute(id);

    return res.status(200).json();
  }
}
