import { ILoginUser } from '@/models/login-user';

export const LoginInitialValues: ILoginUser = {
  email: '',
  password: '',
};

export class LoginRequest {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export interface ILoginResponse {
  success: boolean;
  token: string;
  publicKey: string;
}
