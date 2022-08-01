import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../../repositories/implementation/UsersRepository";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: UsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
