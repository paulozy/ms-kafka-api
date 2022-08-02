import { User } from "@prisma/client";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IShowUserDTO } from "../dtos/IShowUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";

export interface IUsersRepository {
  create({ email, password, name }: ICreateUserDTO): Promise<void>;
  update(data: IUpdateUserDTO, id: string): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<IShowUserDTO | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
