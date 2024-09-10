import { IErrorResponseBody } from '@/utils/interfaces/api-base-response';

export interface IBalancesResponseBody {
  balances: IBalance[];
  totalPages: number;
}

export interface IBalance {
  asset: string;
  amount: string;
}

export interface IBalancesResponse {
  value?: IBalancesResponseBody;
  isSuccess: boolean;
  error?: IErrorResponseBody;
}