import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../../repositories/implementation/UsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: UsersRepository
  ) {}

  async execute({ email, name, password }: IRequest): Promise<void> {
    try {
      const userAlreadyExists = await this.usersRepository.findByEmail(email);

      if (userAlreadyExists) {
        throw new Error("User already exists");
      }

      await this.usersRepository.create({ email, name, password });
    } catch (error) {
      throw new Error("Error creating user");
    }
  }
}
