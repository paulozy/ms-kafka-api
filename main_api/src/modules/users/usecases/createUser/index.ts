import { UsersRepository } from "../../repositories/implementation/UsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const usersRepository = new UsersRepository();
const createUserUseCase = new CreateUserUseCase(usersRepository);
export const createUserController = new CreateUserController(createUserUseCase);
