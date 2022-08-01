import { hash } from "bcryptjs";
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
}
