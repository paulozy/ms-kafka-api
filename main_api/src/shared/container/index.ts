import { container } from "tsyringe";
import { UsersRepository } from "../../modules/users/repositories/implementation/UsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { IEncrypter } from "../../utils/encrypter/IEncrypter";
import { EncrypterBcrypt } from "../../utils/encrypter/implementations/EncrypterBcrypt";
import { TokenGenerator } from "../../utils/tokengenerator/implementations/TokenGenerator";
import { ITokenGenerator } from "../../utils/tokengenerator/ITokenGenerator";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IEncrypter>("Encrypter", EncrypterBcrypt);
container.registerSingleton<ITokenGenerator>("TokenGenerator", TokenGenerator);
