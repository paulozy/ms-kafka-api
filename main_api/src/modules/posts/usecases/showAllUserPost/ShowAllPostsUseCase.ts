import { Post } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IPostsRepository } from "../../repositories/IPostsRepository";


@injectable()
export class ShowAllPostsUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,
  ) { }

  async execute(id: string): Promise<Post[]> {
    try {
      const posts = await this.postsRepository.findAllByUserId(id)
      return posts
    } catch (error) {
      throw new AppError("Error on found posts", 500);
    }

  }
}