import { sign } from "jsonwebtoken";
import { ITokenGenerator } from "../ITokenGenerator";

export class TokenGenerator implements ITokenGenerator {
  constructor() {}

  generate(userId: string): string {
    const token = sign({}, process.env.JSONWEBTOKEN_SECRET as string, {
      subject: userId,
      expiresIn: "1d",
    });

    return token;
  }
}
