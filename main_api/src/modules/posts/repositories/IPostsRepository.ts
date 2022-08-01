import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import { IUpdateUserDTO } from "../dtos/IUpdatePostDTO";

export interface IPostsRepository {
  create({ authorId, content, title }: ICreatePostDTO): Promise<void>;
  update(data: IUpdateUserDTO, id: string): Promise<void>;
  // delete(id: string): Promise<void>;
  // findById(id: string): Promise<IShowUserDTO | undefined>;
  // findByEmail(email: string): Promise<User | undefined>;
}
