import { sign, verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { IAuthentication } from "../IAuthentication";

export class Authentication implements IAuthentication {
  generateToken(userId: string): string {
    const token = sign({}, process.env.JSONWEBTOKEN_SECRET as string, {
      subject: userId,
      expiresIn: "1d",
    });

    return token;
  }

  verifyToken(token: string): void {
    try {
      verify(token, process.env.JSONWEBTOKEN_SECRET as string);
    } catch (error) {
      throw new AppError("Invalid token", 401);
    }
  }
}
