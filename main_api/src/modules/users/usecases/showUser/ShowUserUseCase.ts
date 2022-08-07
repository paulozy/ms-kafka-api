import { inject, injectable } from "tsyringe";
import { IShowUserDTO } from "../../dtos/IShowUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class ShowUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
  ) { }

  async execute(id: string): Promise<IShowUserDTO | undefined> {
    const user = await this.usersRepository.findById(id);
    return user;
  }
}
