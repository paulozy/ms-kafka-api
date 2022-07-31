import { UsersRepository } from "../../repositories/implementation/UsersRepository";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

const usersRepository = new UsersRepository();
const updateUserUseCase = new UpdateUserUseCase(usersRepository);
export const updateUserController = new UpdateUserController(updateUserUseCase);
