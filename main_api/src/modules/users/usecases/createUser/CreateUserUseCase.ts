import { inject, injectable } from "tsyringe";
import { EncrypterBcrypt } from "../../../../utils/encrypter/implementations/EncrypterBcrypt";
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
    private readonly usersRepository: UsersRepository,
    @inject("Encrypter")
    private readonly encrypter: EncrypterBcrypt
  ) {}

  async execute({ email, name, password }: IRequest): Promise<void> {
    try {
      const userAlreadyExists = await this.usersRepository.findByEmail(email);

      if (userAlreadyExists) {
        throw new Error("User already exists");
      }

      const passwordHash = await this.encrypter.encrypt(password);

      await this.usersRepository.create({
        email,
        name,
        password: passwordHash,
      });
    } catch (error) {
      throw new Error(`Error creating user ${error}`);
    }
  }
}
