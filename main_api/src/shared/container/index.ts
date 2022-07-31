import { container } from "tsyringe";
import { UsersRepository } from "../../modules/users/repositories/implementation/UsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
