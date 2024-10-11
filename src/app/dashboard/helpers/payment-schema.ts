import * as Yup from 'yup';

export const paymentSchema = Yup.object().shape({
  destinationPublicKey: Yup.string()
    .required('*Public key is required')
    .length(56, '*Public key must be 56 characters'),
  amount: Yup.number()
    .required('*Amount is required')
    .positive('*Amount must be positive')
    .min(0.001, '*Amount must be greater than 0.001'),
  memo: Yup.string().optional(),
});
