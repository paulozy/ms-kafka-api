import { compare, hash } from "bcryptjs";
import { IEncrypter } from "../IEncrypter";

export class EncrypterBcrypt implements IEncrypter {
  constructor() {}

  async encrypt(value: string): Promise<string> {
    try {
      const valueHashed = await hash(value, 12);
      return valueHashed;
    } catch (error) {
      throw new Error(`Error encrypting password ${error}`);
    }
  }

  async compare(value: string, hash: string): Promise<boolean> {
    try {
      const isMatch = await compare(value, hash);
      return isMatch;
    } catch (error) {
      throw new Error(`Password does not match ${error}`);
    }
  }
}
