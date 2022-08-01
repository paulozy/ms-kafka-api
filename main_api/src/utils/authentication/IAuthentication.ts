export interface IAuthentication {
  generateToken(userId: string): string;
}
