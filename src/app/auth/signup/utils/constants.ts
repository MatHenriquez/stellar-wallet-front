import { IUser } from '@/models/user';

export const initialValues: IUser = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  lastName: '',
  publicKey: '',
  secretKey: '',
};
