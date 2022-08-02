import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { PostsRepository } from "../../repositories/implementations/PostsRepository";

@injectable()
export class DeletePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: PostsRepository
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    try {
      await this.postsRepository.delete(id, userId);
    } catch (error) {
      throw new AppError("Error on deleting post", 500);
    }
  }
}
