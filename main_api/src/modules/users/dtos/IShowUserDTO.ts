import { Post } from "@prisma/client";

export interface IShowUserDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
}
