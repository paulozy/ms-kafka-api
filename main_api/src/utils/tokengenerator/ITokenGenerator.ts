export interface ITokenGenerator {
  generate(userId: string): string;
}
