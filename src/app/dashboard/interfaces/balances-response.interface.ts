import { IAsset } from '@/app/auth/common/interfaces/asset.interface';
import { IErrorResponseBody } from '@/utils/interfaces/api-base-response';

export interface IBalancesResponseBody {
  balances: IBalance[];
  totalPages: number;
}

export interface IBalance {
  asset: string;
  amount: string;
  issuer: string;
}

export interface IBalanceCardProps {
  asset: IAsset;
  amount: string;
  issuer: string;
  paymentAsset: IAsset;
  setPaymentAsset: React.Dispatch<React.SetStateAction<IAsset>>;
}

export interface IBalancesResponse {
  value?: IBalancesResponseBody;
  isSuccess: boolean;
  error?: IErrorResponseBody;
}