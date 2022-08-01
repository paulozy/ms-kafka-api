import { prisma } from "../../../../database";
import { AppError } from "../../../../errors/AppError";
import { ICreatePostDTO } from "../../dtos/ICreatePostDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdatePostDTO";
import { IPostsRepository } from "../IPostsRepository";

export class PostsRepository implements IPostsRepository {
  private repository;

  constructor() {
    this.repository = prisma.post;
  }

  async create({ authorId, content, title }: ICreatePostDTO): Promise<void> {
    try {
      await this.repository.create({
        data: { authorId, content, title },
      });
    } catch (error) {
      throw new AppError("Error creating post", 500);
    }
  }
  update(data: IUpdateUserDTO, id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
