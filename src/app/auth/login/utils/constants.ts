import { ILoginUser } from '@/models/login-user';
import { IErrorResponseBody } from '@/utils/interfaces/api-base-response';

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

export interface ILoginResponseBody {
  success: boolean;
  token: string;
  publicKey: string;
}

export interface ILoginResponse {
  value?: ILoginResponseBody;
  isSuccessful: boolean;
  error?: IErrorResponseBody;
}
