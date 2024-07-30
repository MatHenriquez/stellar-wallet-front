import * as Yup from 'yup';

const errors = {
  required: '*Required',
  invalidEmail: '*Invalid email',
  tooShort: '*Too Short!',
  tooLong: '*Too Long!',
  invalidName: '*Invalid name',
  invalidLastName: '*Invalid lastname',
  invalidPassword: '*Upper/lowercase, number and special character',
  passwordsMustMatch: '*Passwords must match',
};

export const NewUserSchema = Yup.object().shape({
  email: Yup.string().email(errors.invalidEmail).required(errors.required),
  password: Yup.string()
    .required(errors.required)
    .min(8, errors.tooShort)
    .max(50, errors.tooLong)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      errors.invalidPassword,
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], errors.passwordsMustMatch)
    .required(errors.required),
  name: Yup.string()
    .required(errors.required)
    .min(3, errors.tooShort)
    .max(50, errors.tooLong)
    .matches(/^[a-zA-Z-'\s]{3,50}$/, errors.invalidName),
  lastName: Yup.string()
    .required(errors.required)
    .min(3, errors.tooShort)
    .max(50, errors.tooLong)
    .matches(/^[a-zA-Z-'\s]{3,50}$/, errors.invalidLastName),
  publicKey: Yup.string().min(56, errors.tooShort).max(56, errors.tooLong),
  secretKey: Yup.string().min(56, errors.tooShort).max(56, errors.tooLong),
});
