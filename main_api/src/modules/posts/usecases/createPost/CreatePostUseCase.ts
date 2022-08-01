import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { PostsRepository } from "../../repositories/implementations/PostsRepository";

interface IRequest {
  authorId: string;
  content: string;
  title: string;
}

@injectable()
export class CreatePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: PostsRepository
  ) {}

  async execute({ authorId, content, title }: IRequest): Promise<void> {
    try {
      await this.postsRepository.create({ authorId, content, title });
    } catch (error) {
      throw new AppError("Error creating post", 500);
    }
  }
}
