import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const { id } = req.user;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    try {
      await updateUserUseCase.execute(data, id);
      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}
