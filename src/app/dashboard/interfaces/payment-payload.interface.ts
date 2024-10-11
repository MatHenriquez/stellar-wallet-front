export interface IPaymentPayload {
  assetName?: string;
  destinationPublicKey: string;
  amount: number | '';
  memo?: string;
}
