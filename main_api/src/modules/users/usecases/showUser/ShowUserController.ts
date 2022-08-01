import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowUserUseCase } from "./ShowUserUseCase";

export class ShowUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;

    const showUserUseCase = container.resolve(ShowUserUseCase);

    try {
      const user = await showUserUseCase.execute(id);
      return res.json(user);
    } catch (error) {
      res.json(error);
    }
  }
}
