import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const id = "6bddf6cf-8ab4-44d7-a1b4-29bd41447bfasa";

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    try {
      await updateUserUseCase.execute(data, id);
      return res.status(200).json({ test: req.headers });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}
