import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../../repositories/implementation/UsersRepository";

interface IRequest {
  name?: string;
  email?: string;
  password?: string;
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: UsersRepository
  ) {}

  async execute(
    { email, name, password }: IRequest,
    id: string
  ): Promise<void> {
    try {
      await this.usersRepository.update({ email, name, password }, id);
    } catch (error) {
      throw new Error("Error on updating user");
    }
  }
}
