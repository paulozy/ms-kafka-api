import { inject, injectable } from "tsyringe";
import { IShowUserDTO } from "../../dtos/IShowUserDTO";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

@injectable()
export class ShowUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: UsersRepository
  ) {}

  async execute(id: string): Promise<IShowUserDTO> {
    const user = await this.usersRepository.findById(id);
    return user;
  }
}
