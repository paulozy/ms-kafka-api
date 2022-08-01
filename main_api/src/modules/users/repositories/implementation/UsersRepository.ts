import { User } from "@prisma/client";
import { prisma } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository;

  constructor() {
    this.repository = prisma.user;
  }

  async create({ email, password, name }: ICreateUserDTO): Promise<void> {
    try {
      await this.repository.create({
        data: { email, password, name },
      });
    } catch (error) {
      throw new Error("Error on creating user");
    }
  }

  async update(data: IUpdateUserDTO, id: string): Promise<void> {
    try {
      const user = await this.findById(id);

      if (!user) {
        throw new Error("User not found");
      }

      await this.repository.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      throw new Error("Error on updating user");
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.repository.findFirstOrThrow({
        where: { id },
      });

      return user;
    } catch (error) {
      throw new Error("User not found");
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.repository.findFirstOrThrow({
        where: { email },
      });

      return user;
    } catch (error) {
      throw new Error("User not found");
    }
  }
}
