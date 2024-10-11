import { IPaymentPayload } from './payment-payload.interface';

export interface IPaymentProps {
  sendPayment: (paymentPayload: IPaymentPayload) => Promise<void>;
  isSendingPayment: boolean;
  assetName: string;
}
