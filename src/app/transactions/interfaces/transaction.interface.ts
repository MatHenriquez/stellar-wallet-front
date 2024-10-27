export interface ITransaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  asset: string;
  createdAt: string;
  wasSuccessful: boolean;
}
