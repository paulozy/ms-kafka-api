import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { ShowAllPostsUseCase } from './ShowAllPostsUseCase';

export class ShowAllPostsController {

  async handle(req: Request, res: Response): Promise<Response> {

    const { id } = req.user

    const showAllPostsUseCase = container.resolve(ShowAllPostsUseCase)

    try {

      const posts = await showAllPostsUseCase.execute(id)
      return res.status(200).json(posts)
    } catch (error) {
      throw new AppError("Error on found posts", 400);
    }

  }

}