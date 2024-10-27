import { ITransaction } from './transaction.interface';

export interface ITransactionResponse {
  value: {
    payments: ITransaction[];
    totalPages: number;
  };
  isSuccess: boolean;
  error?: string;
}
