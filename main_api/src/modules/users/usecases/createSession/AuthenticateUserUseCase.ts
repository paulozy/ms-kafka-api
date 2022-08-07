import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IAuthentication } from "../../../../utils/authentication/IAuthentication";
import { IEncrypter } from "../../../../utils/encrypter/IEncrypter";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
    private readonly usersRepository: IUsersRepository,
    @inject("Encrypter")
    private readonly encrypter: IEncrypter,
    @inject("Authentication")
    private readonly authenticator: IAuthentication
  ) { }
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
