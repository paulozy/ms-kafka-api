import { Post } from "@prisma/client";
import { prisma } from "../../../../database";
import { AppError } from "../../../../errors/AppError";
import { ICreatePostDTO } from "../../dtos/ICreatePostDTO";
import { IUpdatePostDTO } from "../../dtos/IUpdatePostDTO";
import { IPostsRepository } from "../IPostsRepository";

export class PostsRepository implements IPostsRepository {
  private repository;

  constructor() {
    this.repository = prisma.post;
  }

  async create({ authorId, content, title }: ICreatePostDTO): Promise<Post> {
    try {
      return this.repository.create({
        data: { authorId, content, title },
      });
    } catch (error) {
      throw new AppError("Error creating post", 500);
    }
  }

  async update(
    data: IUpdatePostDTO,
    id: string,
    userId: string
  ): Promise<void> {
    const post = await this.findById(id);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    if (post.authorId !== userId) {
      throw new AppError("You don't have permission to update this post", 403);
    }

    try {
      await this.repository.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new AppError("Error on updating post", 500);
    }
  }

  async delete(id: string, userId: string): Promise<void> {
    const post = await this.findById(id);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    if (post.authorId !== userId) {
      throw new AppError("You don't have permission to delete this post", 403);
    }

    try {
      await this.repository.delete({
        where: { id },
      });
    } catch (error) {
      throw new AppError("Error on deleting post", 500);
    }
  }

  async findById(id: string): Promise<Post | undefined> {
    try {
      const post = await this.repository.findFirstOrThrow({
        where: { id },
      });

      return post;
    } catch (error) {
      throw new AppError("Error on finding post", 500);
    }
  }
}
