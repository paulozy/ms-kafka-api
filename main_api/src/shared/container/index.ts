import { container } from "tsyringe";
import { PostsRepository } from "../../modules/posts/repositories/implementations/PostsRepository";
import { IPostsRepository } from "../../modules/posts/repositories/IPostsRepository";
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

container.registerSingleton<IPostsRepository>(
  "PostsRepository",
  PostsRepository
);

container.registerSingleton<IEncrypter>("Encrypter", EncrypterBcrypt);
container.registerSingleton<IAuthentication>("Authentication", Authentication);
