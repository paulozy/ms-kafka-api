import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { password, email } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    try {
      const token = await authenticateUserUseCase.execute({ email, password });
      res.status(200).json(token);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
