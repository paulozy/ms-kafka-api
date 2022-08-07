import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name?: string;
  email?: string;
  password?: string;
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
  ) { }

  async execute(
    { email, name, password }: IRequest,
    id: string
  ): Promise<void> {
    if (email) {
      const userAlreadyExists = await this.usersRepository.findByEmail(email);

      if (userAlreadyExists) {
        throw new AppError("User already exists");
      }
    }

    try {
      await this.usersRepository.update({ email, name, password }, id);
    } catch (error) {
      throw new AppError(`Error on updating user`, 500);
    }
  }
}
