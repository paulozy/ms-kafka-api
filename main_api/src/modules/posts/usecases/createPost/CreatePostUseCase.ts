import { Post } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { newPost } from "../../../../services/kafka";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IPostsRepository } from "../../repositories/IPostsRepository";

interface IRequest {
  authorId: string;
  content: string;
  title: string;
}

@injectable()
export class CreatePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ authorId, content, title }: IRequest): Promise<void> {
    try {
      const post = await this.postsRepository.create({
        authorId,
        content,
        title,
      });

      await this.sendNotification(post, authorId);
    } catch (error) {
      throw new AppError("Error creating post", 500);
    }
  }

  async sendNotification(post: Post, authorId: string): Promise<void> {
    const users = await this.usersRepository.findAll();

    const usersForSendNotification = users.filter(user => user.id != authorId)

    console.log(usersForSendNotification)

    usersForSendNotification.forEach(async (user) => {
      const message = {
        key: "new_post",
        value: {
          recipient: user.email,
          data: {
            title: post.title,
            content: post.content,
            author: user.name,
          },
        },
      };

      await newPost.send([message]);
    });
  }
}
