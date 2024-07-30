export interface IUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  publicKey: string | undefined;
  secretKey: string | undefined;
}
