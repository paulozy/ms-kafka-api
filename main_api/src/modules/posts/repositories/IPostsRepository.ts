import { Post } from "@prisma/client";
import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import { IUpdatePostDTO } from "../dtos/IUpdatePostDTO";

export interface IPostsRepository {
  create({ authorId, content, title }: ICreatePostDTO): Promise<void>;
  update(data: IUpdatePostDTO, id: string, userId: string): Promise<void>;
  delete(id: string, userId: string): Promise<void>;
  findById(id: string): Promise<Post | undefined>;
}
