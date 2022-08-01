export interface IAuthentication {
  generateToken(userId: string): string;
  verifyToken(token: string): void;
}
