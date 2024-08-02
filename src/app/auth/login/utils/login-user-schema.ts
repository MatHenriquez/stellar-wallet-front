import * as Yup from 'yup';

const errors = {
  required: '*Required',
  invalidEmail: '*Invalid email',
};

export const LoginUserSchema = Yup.object().shape({
  email: Yup.string().email(errors.invalidEmail).required(errors.required),
  password: Yup.string().required(errors.required),
});
