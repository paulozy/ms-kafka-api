import { container } from "tsyringe";
import { UsersRepository } from "../../modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { IAuthentication } from "../../utils/authentication/IAuthentication";
import { Authentication } from "../../utils/authentication/implementations/Authentication";
import { IEncrypter } from "../../utils/encrypter/IEncrypter";
import { EncrypterBcrypt } from "../../utils/encrypter/implementations/EncrypterBcrypt";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IEncrypter>("Encrypter", EncrypterBcrypt);
container.registerSingleton<IAuthentication>("Authentication", Authentication);
