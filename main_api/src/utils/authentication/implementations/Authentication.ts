import { sign } from "jsonwebtoken";
import { IAuthentication } from "../IAuthentication";

export class Authentication implements IAuthentication {
  constructor() {}

  generateToken(userId: string): string {
    const token = sign({}, process.env.JSONWEBTOKEN_SECRET as string, {
      subject: userId,
      expiresIn: "1d",
    });

    return token;
  }
}
