import { inject, injectable } from "tsyringe";
import { Authentication } from "../../../../utils/authentication/implementations/Authentication";
import { EncrypterBcrypt } from "../../../../utils/encrypter/implementations/EncrypterBcrypt";
import { UsersRepository } from "../../repositories/implementation/UsersRepository";

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
      throw new Error("Email or password invalid");
    }

    const passwordMatched = await this.encrypter.compare(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new Error("Password does not match");
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
