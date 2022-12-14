import { User } from "@prisma/client";
import { prisma } from "../../../../database";
import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IShowUserDTO } from "../../dtos/IShowUserDTO";
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
      throw new AppError("Error on creating user", 400);
    }
  }

  async update(data: IUpdateUserDTO, id: string): Promise<void> {
    try {
      const user = await this.findById(id);

      if (!user) {
        throw new AppError("User not found", 404);
      }

      await this.repository.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      throw new AppError("Error on updating user", 500);
    }
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    await this.repository.delete({
      where: { id },
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.repository.findMany();
    return users;
  }

  async findById(id: string): Promise<IShowUserDTO> {
    try {
      const user = await this.repository.findFirstOrThrow({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          posts: true,
        },
      });

      return user;
    } catch (error) {
      throw new AppError("User not found", 404);
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findFirst({
      where: { email },
    });

    return user ? user : undefined;
  }
}
