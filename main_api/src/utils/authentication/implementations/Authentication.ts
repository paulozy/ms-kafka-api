import { sign, verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../modules/users/repositories/implementation/UsersRepository";
import { IAuthentication } from "../IAuthentication";

export class Authentication implements IAuthentication {
  generateToken(userId: string): string {
    const token = sign({}, process.env.JSONWEBTOKEN_SECRET as string, {
      subject: userId,
      expiresIn: "1d",
    });

    return token;
  }

  async verifyToken(token: string): Promise<string> {
    const usersRepository = new UsersRepository();

    try {
      const { sub } = verify(token, process.env.JSONWEBTOKEN_SECRET as string);
      const user = await usersRepository.findById(sub as string);
      return user.id;
    } catch (error) {
      throw new AppError("Invalid token", 401);
    }
  }
}
