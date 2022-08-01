import { User } from "@prisma/client";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";

export interface IUsersRepository {
  create({ email, password, name }: ICreateUserDTO): Promise<void>;
  update(data: IUpdateUserDTO, id: string): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
