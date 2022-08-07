import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IEncrypter } from "../../../../utils/encrypter/IEncrypter";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
    @inject("Encrypter")
    private readonly encrypter: IEncrypter
  ) { }

  async execute({ email, name, password }: IRequest): Promise<void> {
    try {
      const userAlreadyExists = await this.usersRepository.findByEmail(email);

      if (userAlreadyExists) {
        throw new AppError("User already exists");
      }

      const passwordHash = await this.encrypter.encrypt(password);

      await this.usersRepository.create({
        email,
        name,
        password: passwordHash,
      });
    } catch (error) {
      throw new AppError(`Error creating user ${error}`, 500);
    }
  }
}
