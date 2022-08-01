import { compare, hash } from "bcryptjs";
import { AppError } from "../../../errors/AppError";
import { IEncrypter } from "../IEncrypter";

export class EncrypterBcrypt implements IEncrypter {
  constructor() {}

  async encrypt(value: string): Promise<string> {
    try {
      const valueHashed = await hash(value, 12);
      return valueHashed;
    } catch (error) {
      throw new AppError(`Error encrypting password ${error}`, 500);
    }
  }

  async compare(value: string, hash: string): Promise<boolean> {
    try {
      const isMatch = await compare(value, hash);
      return isMatch;
    } catch (error) {
      throw new AppError(`Password does not match ${error}`, 401);
    }
  }
}
