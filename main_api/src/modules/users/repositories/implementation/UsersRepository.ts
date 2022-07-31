import { User } from "@prisma/client";
import { prisma } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
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
      throw new Error("Error creating user");
    }
  }
  findById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
