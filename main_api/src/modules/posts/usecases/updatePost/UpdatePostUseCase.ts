import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUpdatePostDTO } from "../../dtos/IUpdatePostDTO";
import { PostsRepository } from "../../repositories/implementations/PostsRepository";

@injectable()
export class UpdatePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: PostsRepository
  ) {}

  async execute(
    data: IUpdatePostDTO,
    id: string,
    userId: string
  ): Promise<void> {
    try {
      await this.postsRepository.update(data, id, userId);
    } catch (error: any) {
      throw new AppError(`${error.message}`, 500);
    }
  }
}
