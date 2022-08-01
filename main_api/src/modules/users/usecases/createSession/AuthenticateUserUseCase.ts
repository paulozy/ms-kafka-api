import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { Authentication } from "../../../../utils/authentication/implementations/Authentication";
import { EncrypterBcrypt } from "../../../../utils/encrypter/implementations/EncrypterBcrypt";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: UsersRepository,
    @inject("Encrypter")
    private readonly encrypter: EncrypterBcrypt,
    @inject("Authentication")
    private readonly authenticator: Authentication
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    console.log(user);

    if (!user) {
      throw new AppError("Email or password invalid", 401);
    }

    const passwordMatched = await this.encrypter.compare(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError("Password does not match", 401);
    }

    const token = this.authenticator.generateToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
